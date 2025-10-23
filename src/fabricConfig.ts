import * as fabric from "fabric";

const API_BASE = "http://localhost:5000/api/canvas";

// Initialize Fabric.js Canvas
export const initCanvas = (canvasId: string): fabric.Canvas => {
  const canvas = new fabric.Canvas(canvasId, {
    width: 600,
    height: 400,
    backgroundColor: "#fff",
  });
  return canvas;
};

// --- Shape helpers ---
export const addRectangle = (canvas: fabric.Canvas): void => {
  canvas.add(
    new fabric.Rect({
      left: Math.random() * 400,
      top: Math.random() * 300,
      width: 100,
      height: 80,
      fill: "green",
    })
  );
};

export const addCircle = (canvas: fabric.Canvas): void => {
  canvas.add(
    new fabric.Circle({
      left: Math.random() * 400,
      top: Math.random() * 300,
      radius: 40,
      fill: "blue",
    })
  );
};

export const addText = (canvas: fabric.Canvas): void => {
  canvas.add(
    new fabric.Text("Fabric.js ❤️", {
      left: Math.random() * 400,
      top: Math.random() * 300,
      fontSize: 24,
      fill: "purple",
    })
  );
};

// --- API Calls ---
// Save canvas data to MongoDB
export const saveCanvasToServer = async (
  canvas: fabric.Canvas,
  name: string = "myCanvas"
): Promise<void> => {
  const json = canvas.toJSON();
  try {
    const res = await fetch(`${API_BASE}/save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, data: json }),
    });
    const result = await res.json();
    alert(result.message || "Canvas saved!");
  } catch (err) {
    console.error("Error saving canvas:", err);
  }
};

export const loadCanvasFromServer = async (
  canvas: fabric.Canvas,
  name: string = "myCanvas"
): Promise<void> => {
  try {
    const res = await fetch(`${API_BASE}/get/${name}`);
    if (!res.ok) throw new Error("Canvas not found");

    const { data } = await res.json();
    console.log("Data from server:", data);

    // Load canvas and ensure proper rendering
    canvas.loadFromJSON(data, () => {
      canvas.renderAll();
      canvas.requestRenderAll(); // 👈 ensures refresh even if async images/texts
      console.log("✅ Canvas loaded and rendered");
    });

    // Optional: force slight change to trigger re-render (safety net)
    setTimeout(() => {
      canvas.renderAll();
    }, 200);

    alert("Canvas loaded from server!");
  } catch (err) {
    console.error("Error loading canvas:", err);
    alert("Failed to load canvas");
  }
};


export const clearCanvas = (canvas: fabric.Canvas): void => {
  canvas.clear();
};
