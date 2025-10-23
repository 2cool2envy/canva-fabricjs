import React, { useEffect, useRef } from "react";
import {
  initCanvas,
  addRectangle,
  addCircle,
  addText,
  saveCanvasToServer,
  loadCanvasFromServer,
  clearCanvas,
} from "./fabricConfig";

const CanvasPage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<any>(null);

  useEffect(() => {
    fabricRef.current = initCanvas("fabricCanvas");
    return () => fabricRef.current.dispose();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: "30px",
        gap: "40px",
      }}
    >
      {/* Left side buttons */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <h4>Actions</h4>
        <button
          className="btn btn-primary"
          onClick={() => addRectangle(fabricRef.current)}
        >
          Add Rectangle
        </button>

        <button
          className="btn btn-warning"
          onClick={() => addCircle(fabricRef.current)}
        >
          Add Circle
        </button>

        <button
          className="btn btn-success"
          onClick={() => addText(fabricRef.current)}
        >
          Add Text
        </button>

        <button
          className="btn btn-primary"
          onClick={() => saveCanvasToServer(fabricRef.current)}
        >
          💾 Save to DB
        </button>

        <button
          className="btn btn-success"
          onClick={() => loadCanvasFromServer(fabricRef.current)}
        >
          🔁 Load from DB
        </button>

        <button
          className="btn btn-danger"
          onClick={() => clearCanvas(fabricRef.current)}
        >
          🧹 Clear
        </button>
      </div>

      {/* Center canvas */}
      <div style={{ textAlign: "center" }}>
        <h2>Test - Kapoor Mohit</h2>
        <canvas
          id="fabricCanvas"
          ref={canvasRef}
          width={600}
          height={400}
          style={{ border: "1px solid #aaa" }}
        />
      </div>
    </div>
  );
};

export default CanvasPage;
