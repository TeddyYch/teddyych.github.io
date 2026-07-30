import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  BufferGeometry,
  DirectionalLight,
  EdgesGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  HemisphereLight,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Scene,
  Shape,
  ShapeGeometry,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
  type ExtrudeGeometryOptions,
} from "three";

const MAX_ROTATION_X = MathUtils.degToRad(9);
const MAX_ROTATION_Y = MathUtils.degToRad(15);

type TYMonogram3DProps = {
  onUnavailable: () => void;
};

function amplifyPointerResponse(value: number) {
  return Math.sign(value) * Math.pow(Math.abs(value), 0.82);
}

function createTShape() {
  const shape = new Shape();
  shape.moveTo(-3.35, 1.75);
  shape.lineTo(-0.05, 1.75);
  shape.lineTo(-0.05, 1.02);
  shape.lineTo(-1.22, 1.02);
  shape.lineTo(-1.22, -1.75);
  shape.lineTo(-2.18, -1.75);
  shape.lineTo(-2.18, 1.02);
  shape.lineTo(-3.35, 1.02);
  shape.closePath();
  return shape;
}

function createYShape() {
  const shape = new Shape();
  shape.moveTo(0.12, 1.75);
  shape.lineTo(1.12, 1.75);
  shape.lineTo(1.82, 0.67);
  shape.lineTo(2.53, 1.75);
  shape.lineTo(3.53, 1.75);
  shape.lineTo(2.3, -0.08);
  shape.lineTo(2.3, -1.75);
  shape.lineTo(1.34, -1.75);
  shape.lineTo(1.34, -0.08);
  shape.closePath();
  return shape;
}

function createLinework(points: number[], material: LineBasicMaterial) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(points, 3));
  const lines = new LineSegments(geometry, material);
  lines.renderOrder = 4;
  return lines;
}

const blueprintLinework = [
  -3.08, 1.49, 0, -0.31, 1.49, 0,
  -2.93, 1.25, 0, -0.43, 1.25, 0,
  -1.94, 0.87, 0, -1.94, -1.48, 0,
  -1.64, 0.87, 0, -1.64, -1.48, 0,
  0.55, 1.49, 0, 1.82, -0.38, 0,
  3.1, 1.49, 0, 1.82, -0.38, 0,
  1.58, -0.28, 0, 1.58, -1.48, 0,
  2.06, -0.28, 0, 2.06, -1.48, 0,
];

const violetAccentLinework = [
  -3.28, 1.71, 0, -2.63, 1.71, 0,
  -1.23, -1.69, 0, -1.23, -1.14, 0,
  2.9, 1.71, 0, 3.46, 1.71, 0,
  2.29, -1.69, 0, 2.29, -1.2, 0,
];

export default function TYMonogram3D({ onUnavailable }: TYMonogram3DProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      onUnavailable();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.outputColorSpace = SRGBColorSpace;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.tabIndex = -1;
    host.appendChild(renderer.domElement);

    const onContextLost = (event: Event) => {
      event.preventDefault();
      onUnavailable();
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    const scene = new Scene();
    const camera = new PerspectiveCamera(34, 16 / 9, 0.1, 50);
    camera.position.set(0.3, 0.12, 11.2);
    camera.lookAt(0, 0, 0);

    const frontLayer = new Group();
    const middleLayer = new Group();
    const rearLayer = new Group();
    frontLayer.position.z = 0.42;
    middleLayer.position.z = 0;
    rearLayer.position.z = -0.42;
    scene.add(rearLayer, middleLayer, frontLayer);

    const bodyMaterial = new MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      roughness: 0.18,
      metalness: 0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.24,
      transmission: 0.12,
      thickness: 0.42,
    });
    const sideMaterial = new MeshPhysicalMaterial({
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      roughness: 0.22,
      metalness: 0,
      transmission: 0.08,
      thickness: 0.35,
    });
    const frontEdgeMaterials = [0, 1].map(() => new LineBasicMaterial({
      transparent: true,
      opacity: 0.89,
      depthWrite: false,
    }));
    const middleEdgeMaterial = new LineBasicMaterial({
      transparent: true,
      opacity: 0.66,
      depthWrite: false,
    });
    const rearEdgeMaterial = new LineBasicMaterial({
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const lineworkMaterial = new LineBasicMaterial({
      transparent: true,
      opacity: 0.52,
      depthWrite: false,
    });
    const violetAccentMaterial = new LineBasicMaterial({
      transparent: true,
      opacity: 0.3,
      depthWrite: false,
    });

    const ambient = new HemisphereLight(0x8bcaff, 0x07122a, 1.05);
    const keyLight = new DirectionalLight(0xa8dfff, 3.4);
    keyLight.position.set(3.2, 3.4, 6);
    scene.add(ambient, keyLight);

    const shapes = [createTShape(), createYShape()];
    const geometries: BufferGeometry[] = [];
    const outlineGeometries = shapes.map((shape) => {
      const faceGeometry = new ShapeGeometry(shape, 1);
      const outlineGeometry = new EdgesGeometry(faceGeometry, 1);
      faceGeometry.dispose();
      geometries.push(outlineGeometry);
      return outlineGeometry;
    });

    const addOutlineShell = (layer: Group, material: LineBasicMaterial | LineBasicMaterial[], scale: number, renderOrder: number) => {
      layer.scale.setScalar(scale);
      outlineGeometries.forEach((geometry, index) => {
        const outlineMaterial = Array.isArray(material) ? material[index] : material;
        const outline = new LineSegments(geometry, outlineMaterial);
        outline.renderOrder = renderOrder;
        layer.add(outline);
      });
    };

    addOutlineShell(frontLayer, frontEdgeMaterials, 1, 5);
    addOutlineShell(middleLayer, middleEdgeMaterial, 0.985, 3);
    addOutlineShell(rearLayer, rearEdgeMaterial, 0.967, 1);

    const extrudeSettings: ExtrudeGeometryOptions = {
      depth: 0.42,
      steps: 1,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 2,
      curveSegments: 1,
    };

    shapes.forEach((shape) => {
      const geometry = new ExtrudeGeometry(shape, extrudeSettings);
      geometry.translate(0, 0, -0.21);
      geometry.computeVertexNormals();
      geometries.push(geometry);
      const body = new Mesh(geometry, [bodyMaterial, sideMaterial]);
      body.renderOrder = 2;
      middleLayer.add(body);
    });

    const frontLinework = createLinework(blueprintLinework, lineworkMaterial);
    const violetAccents = createLinework(violetAccentLinework, violetAccentMaterial);
    geometries.push(frontLinework.geometry, violetAccents.geometry);
    frontLinework.position.z = 0.018;
    violetAccents.position.z = 0.026;
    frontLayer.add(frontLinework, violetAccents);

    const pointer = new Vector2();
    const targetRotation = new Vector2();
    let frameId = 0;
    let visible = true;
    let running = false;
    let lastTime = performance.now();
    let darkTheme = document.documentElement.classList.contains("dark");

    const layerTargets = [
      { layer: frontLayer, rate: 1.12, shiftX: 0.2, shiftY: 0.12, baseZ: 0.42, shiftZ: 0.11 },
      { layer: middleLayer, rate: 1, shiftX: 0.11, shiftY: 0.07, baseZ: 0, shiftZ: 0.035 },
      { layer: rearLayer, rate: 0.78, shiftX: 0.035, shiftY: 0.025, baseZ: -0.42, shiftZ: -0.075 },
    ];

    function startRender() {
      if (!visible || running) return;
      running = true;
      lastTime = performance.now();
      frameId = window.requestAnimationFrame(render);
    }

    const applyTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      darkTheme = dark;

      bodyMaterial.color.setHex(dark ? 0x0a3479 : 0xc7e1fa);
      bodyMaterial.emissive.setHex(dark ? 0x07316f : 0x76b9ed);
      bodyMaterial.emissiveIntensity = dark ? 0.34 : 0.08;
      bodyMaterial.opacity = dark ? 0.13 : 0.2;
      bodyMaterial.transmission = dark ? 0.12 : 0.38;

      sideMaterial.color.setHex(dark ? 0x0b2858 : 0xa8d2f5);
      sideMaterial.emissive.setHex(dark ? 0x081d46 : 0x5ca8e8);
      sideMaterial.emissiveIntensity = dark ? 0.2 : 0.05;
      sideMaterial.opacity = dark ? 0.19 : 0.16;
      sideMaterial.transmission = dark ? 0.08 : 0.3;

      frontEdgeMaterials.forEach((material) => {
        material.color.setHex(dark ? 0x64caff : 0x006fcf);
        material.opacity = dark ? 0.89 : 0.83;
      });
      middleEdgeMaterial.color.setHex(dark ? 0x268cff : 0x2689d8);
      middleEdgeMaterial.opacity = dark ? 0.68 : 0.56;
      rearEdgeMaterial.color.setHex(dark ? 0x1454b5 : 0x4d94cb);
      rearEdgeMaterial.opacity = dark ? 0.34 : 0.28;
      lineworkMaterial.color.setHex(dark ? 0x9addff : 0x075fae);
      lineworkMaterial.opacity = dark ? 0.5 : 0.46;
      violetAccentMaterial.color.setHex(dark ? 0x8d72e8 : 0x6651a8);
      violetAccentMaterial.opacity = dark ? 0.3 : 0.24;

      ambient.color.setHex(dark ? 0x8bcaff : 0xd5edff);
      ambient.groundColor.setHex(dark ? 0x07122a : 0xb8d8ef);
      ambient.intensity = dark ? 1.05 : 1.25;
      keyLight.color.setHex(dark ? 0xa8dfff : 0xffffff);
      keyLight.intensity = dark ? 3.4 : 2.35;
      renderer.toneMappingExposure = dark ? 1.16 : 0.96;
      startRender();
    };

    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      startRender();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = interactionSurface.getBoundingClientRect();
      const normalisedX = MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const normalisedY = MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      pointer.x = amplifyPointerResponse(normalisedX);
      pointer.y = amplifyPointerResponse(normalisedY);
      targetRotation.x = -pointer.y * MAX_ROTATION_X;
      targetRotation.y = pointer.x * MAX_ROTATION_Y;
      startRender();
    };

    const onPointerLeave = () => {
      pointer.set(0, 0);
      targetRotation.set(0, 0);
      startRender();
    };

    function render(time: number) {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const damping = 1 - Math.exp(-8.1 * delta);
      let motionRemaining = 0;
      const depthSignal = Math.min(Math.hypot(pointer.x, pointer.y) / Math.SQRT2, 1);

      layerTargets.forEach(({ layer, rate, shiftX, shiftY, baseZ, shiftZ }) => {
        const targetX = targetRotation.x * rate;
        const targetY = targetRotation.y * rate;
        const targetPositionX = pointer.x * shiftX;
        const targetPositionY = -pointer.y * shiftY;
        const targetPositionZ = baseZ + depthSignal * shiftZ;

        layer.rotation.x = MathUtils.lerp(layer.rotation.x, targetX, damping);
        layer.rotation.y = MathUtils.lerp(layer.rotation.y, targetY, damping);
        layer.position.x = MathUtils.lerp(layer.position.x, targetPositionX, damping);
        layer.position.y = MathUtils.lerp(layer.position.y, targetPositionY, damping);
        layer.position.z = MathUtils.lerp(layer.position.z, targetPositionZ, damping);

        motionRemaining +=
          Math.abs(layer.rotation.x - targetX) +
          Math.abs(layer.rotation.y - targetY) +
          Math.abs(layer.position.x - targetPositionX) +
          Math.abs(layer.position.y - targetPositionY) +
          Math.abs(layer.position.z - targetPositionZ);
      });

      const targetLightX = 3.2 + pointer.x * 3.35;
      const targetLightY = 3.4 - pointer.y * 2.25;
      const targetLightIntensity = (darkTheme ? 3.4 : 2.35) + Math.abs(pointer.x) * 0.5;
      const targetCameraX = 0.3 + pointer.x * 0.16;
      const targetCameraY = 0.12 - pointer.y * 0.1;
      const targetCameraZ = 11.2 - depthSignal * 0.12;

      keyLight.position.x = MathUtils.lerp(keyLight.position.x, targetLightX, damping);
      keyLight.position.y = MathUtils.lerp(keyLight.position.y, targetLightY, damping);
      keyLight.intensity = MathUtils.lerp(keyLight.intensity, targetLightIntensity, damping);
      camera.position.x = MathUtils.lerp(camera.position.x, targetCameraX, damping * 0.76);
      camera.position.y = MathUtils.lerp(camera.position.y, targetCameraY, damping * 0.76);
      camera.position.z = MathUtils.lerp(camera.position.z, targetCameraZ, damping * 0.76);
      camera.lookAt(0, 0, 0);

      const leftHighlight = (1 - pointer.x) * 0.5;
      const rightHighlight = (1 + pointer.x) * 0.5;
      const baseEdgeOpacity = darkTheme ? 0.78 : 0.72;
      frontEdgeMaterials[0].opacity = baseEdgeOpacity + leftHighlight * 0.22;
      frontEdgeMaterials[1].opacity = baseEdgeOpacity + rightHighlight * 0.22;

      motionRemaining +=
        Math.abs(keyLight.position.x - targetLightX) +
        Math.abs(keyLight.position.y - targetLightY) +
        Math.abs(keyLight.intensity - targetLightIntensity) +
        Math.abs(camera.position.x - targetCameraX) +
        Math.abs(camera.position.y - targetCameraY) +
        Math.abs(camera.position.z - targetCameraZ);

      renderer.render(scene, camera);
      if (visible && motionRemaining > 0.00055) {
        frameId = window.requestAnimationFrame(render);
      } else {
        running = false;
      }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      const nextVisible = entry.isIntersecting;
      if (nextVisible && !visible) {
        visible = true;
        startRender();
      } else if (!nextVisible && visible) {
        visible = false;
        window.cancelAnimationFrame(frameId);
        running = false;
      }
    }, { rootMargin: "160px 0px", threshold: 0.02 });
    intersectionObserver.observe(host);

    const interactionSurface = host.closest<HTMLElement>(".ty-section") ?? host;
    interactionSurface.addEventListener("pointermove", onPointerMove, { passive: true });
    interactionSurface.addEventListener("pointerleave", onPointerLeave);
    applyTheme();
    resize();
    startRender();

    return () => {
      visible = false;
      window.cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      interactionSurface.removeEventListener("pointermove", onPointerMove);
      interactionSurface.removeEventListener("pointerleave", onPointerLeave);

      geometries.forEach((geometry) => geometry.dispose());
      bodyMaterial.dispose();
      sideMaterial.dispose();
      frontEdgeMaterials.forEach((material) => material.dispose());
      middleEdgeMaterial.dispose();
      rearEdgeMaterial.dispose();
      lineworkMaterial.dispose();
      violetAccentMaterial.dispose();
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [onUnavailable]);

  return <div ref={hostRef} className="ty-canvas" aria-hidden="true" />;
}
