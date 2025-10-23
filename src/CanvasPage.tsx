import React, { useEffect, useRef, useState } from "react";
import {
  initCanvas,
  addRectangle,
  addCircle,
  saveCanvasToServer,
  loadCanvasFromServer,
  clearCanvas,
} from "./fabricConfig";

import * as fabric from "fabric";


// All constants grouped here
const constants = {
  fontFamilies: [
    "Arial",
    "Courier New",
    "Georgia",
    "Times New Roman",
    "Verdana",
    "Comic Sans MS",
  ],
  defaultText: "Kapoor box box box",
  defaultFontSize: 24,
  defaultFontFamily: "Arial",
  defaultColor: "#800080", // purple
};



const CanvasPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);

  // Text style states using constants
  const [text, setText] = useState(constants.defaultText);
  const [fontSize, setFontSize] = useState(constants.defaultFontSize);
  const [fontFamily, setFontFamily] = useState(constants.defaultFontFamily);
  const [color, setColor] = useState(constants.defaultColor);

  useEffect(() => {
    fabricRef.current = initCanvas("fabricCanvas");
    return () => fabricRef.current.dispose();
  }, []);

  const addStyledText = () => {
    if (!fabricRef.current) return;
    fabricRef.current.add(
      new fabric.Text(text, {
        left: Math.random() * 400,
        top: Math.random() * 300,
        fontSize,
        fontFamily,
        fill: color,
      })
    );
  };

  const saveCanvasAsPNG = () => {
    if (!fabricRef.current) return;
    const dataURL = fabricRef.current.toDataURL({
      format: "png",
      quality: 1.0,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Left panel: Save / Load */}
        <div className="col-md-2 d-flex flex-column align-items-start gap-3">
          <h5>Database</h5>
          <button
            className="btn btn-outline-primary w-100"
            onClick={() => saveCanvasToServer(fabricRef.current)}
          >
            Save to DB
          </button>
          <button
            className="btn btn-outline-success w-100"
            onClick={() => loadCanvasFromServer(fabricRef.current)}
          >
            Load from DB
          </button>

          <h5>Export</h5>
          <button
            className="btn btn-outline-secondary w-100"
            onClick={saveCanvasAsPNG}
          >
            Save as PNG
          </button>

        </div>

        {/* Center panel: canvas + text style toolbar */}
        <div className="col-md-8 d-flex flex-column align-items-center">
          {/* Text style toolbar */}
          <div className="d-flex align-items-center gap-3 mb-3 w-100 justify-content-center flex-wrap">
            <input
              type="text"
              className="form-control"
              style={{ maxWidth: "200px" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
            />

            <select
              className="form-select"
              style={{ maxWidth: "150px" }}
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              {constants.fontFamilies.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <input
              type="number"
              className="form-control"
              style={{ maxWidth: "100px" }}
              value={fontSize}
              min={8}
              max={72}
              onChange={(e) => setFontSize(parseInt(e.target.value) || constants.defaultFontSize)}
              title="Font Size"
            />

            <input
              type="color"
              className="form-control form-control-color"
              style={{ width: "50px", padding: 0 }}
              value={color}
              onChange={(e) => setColor(e.target.value)}
              title="Text Color"
            />

            <button className="btn btn-success" onClick={addStyledText}>
              Add Text
            </button>
          </div>

          {/* Canvas */}
          <canvas
            id="fabricCanvas"
            ref={canvasRef}
            width={800}
            height={600}
            style={{ border: "2px solid #ddd", borderRadius: "8px" }}
          />
        </div>

        {/* Right panel: other shapes + clear */}
        <div className="col-md-2 d-flex flex-column align-items-end gap-3">
          <h5>Shapes & Actions</h5>
          <button
            className="btn btn-primary w-100"
            onClick={() => addRectangle(fabricRef.current)}
          >
            Add Rectangle
          </button>

          <button
            className="btn btn-warning w-100"
            onClick={() => addCircle(fabricRef.current)}
          >
            Add Circle
          </button>

          <button
            className="btn btn-danger w-100"
            onClick={() => clearCanvas(fabricRef.current)}
          >
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
};

export default CanvasPage;
