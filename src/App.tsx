import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric"; // Using namespace import for fabric.js

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Canvas DOM reference
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null); // Fabric.js canvas instance state
  const [designName, setDesignName] = useState<string>("default-name"); // Design name state

  useEffect(() => {
    let fabricCanvas: fabric.Canvas | null = null;

    // Initialize fabric.js canvas on first render
    if (canvasRef.current) {
      fabricCanvas = new fabric.Canvas(canvasRef.current); // Create a new fabric canvas
      setCanvas(fabricCanvas); // Save canvas instance to state
    }

    // Cleanup function to dispose of the canvas
    return () => {
      if (fabricCanvas) {
        fabricCanvas.dispose();
        setCanvas(null); // Clear canvas state
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once


  const clearCanvas = () => {
    if (!canvas) return;
    canvas.clear(); // Clear the canvas
  };


  const addText = () => {
    if (!canvas) return;
    const text = new fabric.Textbox("Double-click to edit me", {
      left: 50,
      top: 50,
      fill: "black",
      fontSize: 20,
    });
    canvas.add(text); // Add text to the canvas
  };

  const addCircle = () => {
    if (!canvas) return;
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50, // 50 pixels radius
      fill: "green",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(circle); // Add circle to the canvas
  };

  const addTriangle = () => {
    if (!canvas) return;
    const triangle = new fabric.Triangle({
      left: 150,
      top: 150,
      width: 100, // Base width
      height: 100, // Height
      fill: "yellow",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(triangle); // Add a triangle to the canvas
  };
  const addEllipse = () => {
    if (!canvas) return;
    const ellipse = new fabric.Ellipse({
      left: 100,
      top: 100,
      rx: 70, // X-axis radius
      ry: 50, // Y-axis radius
      fill: "pink",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(ellipse); // Add ellipse to the canvas
  };

  const addPolygon = () => {
    if (!canvas) return;
    const points = [
      { x: 200, y: 10 },
      { x: 250, y: 50 },
      { x: 230, y: 100 },
      { x: 170, y: 100 },
      { x: 150, y: 50 },
    ];
    const polygon = new fabric.Polygon(points, {
      fill: "orange",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(polygon); // Add polygon to the canvas
  };

  const addHexagon = () => {
    if (!canvas) return;
    const hexagon = new fabric.Polygon(
      [
        { x: 50, y: 0 },
        { x: 100, y: 30 },
        { x: 100, y: 80 },
        { x: 50, y: 110 },
        { x: 0, y: 80 },
        { x: 0, y: 30 },
      ],
      {
        left: 150,
        top: 150,
        fill: "teal",
        stroke: "black",
        strokeWidth: 2,
      }
    );
    canvas.add(hexagon); // Add hexagon to the canvas
  };

  const addLine = () => {
    if (!canvas) return;
    const line = new fabric.Line([50, 50, 200, 200], {
      left: 100,
      top: 100,
      stroke: "red",
      strokeWidth: 3,
    });
    canvas.add(line); // Add line to the canvas
  };

  const addArrow = () => {
    if (!canvas) return;
    const arrow = new fabric.Polygon(
      [
        { x: 0, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 50 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 25, y: 50 },
        { x: 0, y: 50 },
      ],
      {
        fill: "blue",
        left: 150,
        top: 150,
      }
    );
    canvas.add(arrow);
  };

  const addStar = () => {
    if (!canvas) return;
    const starPoints = [
      { x: 100, y: 0 },
      { x: 120, y: 70 },
      { x: 200, y: 70 },
      { x: 140, y: 110 },
      { x: 160, y: 180 },
      { x: 100, y: 140 },
      { x: 40, y: 180 },
      { x: 60, y: 110 },
      { x: 0, y: 70 },
      { x: 80, y: 70 },
    ];
    const star = new fabric.Polygon(starPoints, {
      left: 150,
      top: 150,
      fill: "yellow",
      stroke: "black",
      strokeWidth: 2,
    });
    canvas.add(star); // Add star to the canvas
  };

  const addHeart = () => {
    if (!canvas) return;
    const heart = new fabric.Path(
      "M 272 279 C 272 251 258 236 240 236 C 227 236 216 244 210 253 C 207 244 200 236 190 236 C 178 236 168 243 163 252 C 155 243 144 236 132 236 C 113 236 100 251 100 279 C 100 304 119 321 140 339 C 157 354 174 368 189 384 C 204 368 221 354 239 339 C 260 321 279 304 279 279 Z",
      {
        left: 50,
        top: 50,
        fill: "red",
      }
    );
    canvas.add(heart);
  };

  const addPentagon = () => {
    if (!canvas) return;
    const pentagon = new fabric.Polygon(
      [
        { x: 0, y: -50 },
        { x: 50, y: 0 },
        { x: 30, y: 50 },
        { x: -30, y: 50 },
        { x: -50, y: 0 },
      ],
      {
        left: 150,
        top: 100,
        fill: "brown",
        stroke: "black",
        strokeWidth: 2,
      }
    );
    canvas.add(pentagon); // Add pentagon to the canvas
  };

  const changeTextStyle = (property: string, value: string | number) => {
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set(property, value);
      canvas.renderAll();
    }
  };

  const downloadDesign = () => {
    if (!canvas) return alert("Canvas not initialized!");
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = `${designName || "design"}.png`;
    link.click();
  };

  const saveToLocal = () => {
    if (!canvas) return alert("Canvas not initialized!");
    if (!designName.trim()) return alert("Please enter a design name to save!");

    const json = JSON.stringify(canvas.toJSON());
    console.log("Saving JSON data:", JSON.parse(json)); // Log saved JSON
    localStorage.setItem(designName, json);
    alert(`Design saved with name: "${designName}". You can load it later.`);
  };

  const loadFromLocal = () => {
    if (!canvas) return alert("Canvas not initialized!");
    if (!designName.trim()) return alert("Please enter the name of the design to load!");

    const savedCanvas = localStorage.getItem(designName);

    if (savedCanvas) {
      try {
        const jsonData = JSON.parse(savedCanvas); // Parse the JSON string
        console.log('Loaded JSON data:', jsonData); // Log the loaded JSON data for debugging
        canvas.loadFromJSON(jsonData, () => {
          console.log("Design successfully loaded, rendering the canvas...");
          canvas.getObjects().forEach(obj => {
            if (obj.scaleX === 0 || obj.scaleY === 0) {
              obj.scaleX = 1;
              obj.scaleY = 1;
            }
          });
          canvas.setViewportTransform([1, 0, 0, 1, 0, 0]); // Reset any scaling/zooming
          canvas.renderAll(); // Make sure the canvas is rendered with loaded objects
          alert(`Design "${designName}" has been loaded successfully!`);
        });
      } catch (error) {
        console.error("Error loading design:", error);
        alert("Failed to load the design. The saved data might be corrupted.");
      }
    } else {
      alert(`No design found with the name "${designName}".`);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Left-side panel for adding shapes */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#f8f8f8",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Add Shapes</h2>
        <button className="button is-info is-light" onClick={addCircle} style={{ marginBottom: "10px", width: "100%" }}> Add Circle </button>
        <button className="button is-info is-light" onClick={addTriangle} style={{ marginBottom: "10px", width: "100%" }}> Add Triangle </button>
        <button className="button is-info is-light" onClick={addEllipse} style={{ marginBottom: "10px", width: "100%" }}> Add Ellipse </button>
        <button className="button is-info is-light" onClick={addPolygon} style={{ marginBottom: "10px", width: "100%" }}> Add Polygon </button>
        <button className="button is-info is-light" onClick={addHexagon} style={{ marginBottom: "10px", width: "100%" }}> Add Hexagon </button>
        <button className="button is-info is-light" onClick={addLine} style={{ marginBottom: "10px", width: "100%" }}> Add Line </button>
        <button className="button is-info is-light" onClick={addArrow} style={{ marginBottom: "10px", width: "100%" }}>Add Arrow</button>
        <button className="button is-info is-light" onClick={addStar} style={{ marginBottom: "10px", width: "100%" }}>Add Star</button>
        <button className="button is-info is-light" onClick={addHeart} style={{ marginBottom: "10px", width: "100%" }}>Add Heart</button>
        <button className="button is-info is-light" onClick={addPentagon} style={{ marginBottom: "10px", width: "100%" }}>Add Pentagon</button>
      </div>

      {/* Main canvas and control panel */}
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <h1>ReactJS kapoor Fabric.js Design App</h1>
        {/* Buttons for the top panel */}
        <div style={{ marginBottom: "20px" }}>
          <button className="button is-info is-light" onClick={addText} style={{ margin: "0 10px" }}>
            Add Text
          </button>
          <button className="button is-info is-light" onClick={() => changeTextStyle("fill", "red")} style={{ margin: "0 10px" }}>
            Red Color
          </button>
          <button className="button is-info is-light" onClick={() => changeTextStyle("fill", "blue")} style={{ margin: "0 10px" }}>
            Blue Color
          </button>
          <button className="button is-info is-light" onClick={() => changeTextStyle("fontWeight", "bold")} style={{ margin: "0 10px" }}>
            Bold Text
          </button>
          <button className="button is-info is-light" onClick={() => changeTextStyle("fontWeight", "normal")} style={{ margin: "0 10px" }}>
            Normal Text
          </button>
          <button className="button is-info is-light" onClick={clearCanvas} style={{ margin: "0 10px" }}>
            Clear Canvas
          </button>
        </div>

        {/* Save, Load, and Download options */}
        <div style={{ marginBottom: "20px" }}>
          <input
            className="input is-primary"
            type="text"
            placeholder="Enter Design Name..."
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button className="button is-success is-light" onClick={downloadDesign}>Download as PNG</button>
          <button className="button is-success is-light" onClick={saveToLocal} style={{ marginLeft: "10px" }}>
            Save Design
          </button>
          <button className="button is-success is-light" onClick={loadFromLocal} style={{ marginLeft: "10px" }}>
            Load Design
          </button>
        </div>

        {/* Canvas element */}
        <div style={{ width: "fit-content", margin: "0 auto" }}>
          <canvas
            id="fabric-canvas"
            ref={canvasRef} // Attach the canvas to this ref
            width={970}
            height={368}
            style={{ border: "1px solid black" }}
          ></canvas>
        </div>

      </div>
    </div>
  );
};

export default App;