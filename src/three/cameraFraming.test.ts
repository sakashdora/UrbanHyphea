import test from 'node:test';
import assert from 'node:assert/strict';
import { Box3, PerspectiveCamera, Vector3 } from 'three';
import { getFramingDistance, getRotatingFramingDistance } from './cameraFraming';

test('camera framing keeps the entire specimen inside narrow mobile, tablet, and wide viewports', () => {
  const bounds = new Box3(new Vector3(-1.8, 0, -1.8), new Vector3(1.8, 2.2, 1.8));
  const direction = new Vector3(2.95, 1.5, 3.85).normalize();
  const center = bounds.getCenter(new Vector3());
  for (const aspect of [0.65, 0.85, 1, 1.4, 2]) {
    const fov = aspect < 1 ? 42 : 34;
    const camera = new PerspectiveCamera(fov, aspect, 0.1, 45);
    camera.position.copy(center).addScaledVector(direction, getFramingDistance(bounds, direction, fov, aspect));
    camera.lookAt(center);
    camera.updateMatrixWorld();
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const projected = new Vector3(x, y, z).project(camera);
      assert.ok(Math.abs(projected.x) < 1, `Horizontal crop at aspect ${aspect}`);
      assert.ok(Math.abs(projected.y) < 1, `Vertical crop at aspect ${aspect}`);
      assert.ok(projected.z > -1 && projected.z < 1, `Clipped depth at aspect ${aspect}`);
    }
  }
});

test('a rotating specimen stays framed throughout its scroll movement', () => {
  const specimen = new Box3(new Vector3(-1.8, 0, -1.5), new Vector3(1.8, 2.2, 1.5));
  const radius = Math.hypot(1.8, 1.5);
  const bounds = new Box3(new Vector3(-radius, 0, -radius), new Vector3(radius, 2.2, radius));
  const direction = new Vector3(2.95, 1.5, 3.85).normalize();
  const center = bounds.getCenter(new Vector3());
  for (const aspect of [0.7, 1, 1.5]) {
    const fov = aspect < 1 ? 42 : 34;
    const camera = new PerspectiveCamera(fov, aspect, 0.1, 45);
    const distance = getRotatingFramingDistance(specimen, direction, fov, aspect, 1.2);
    assert.ok(distance < getFramingDistance(bounds, direction, fov, aspect), 'Rotating fit avoids excess empty space');
    camera.position.copy(center).addScaledVector(direction, distance);
    camera.lookAt(center);
    camera.updateMatrixWorld();
    for (let angle = 0; angle <= 1.2; angle += 0.1) {
      for (const x of [specimen.min.x, specimen.max.x]) for (const y of [specimen.min.y, specimen.max.y]) for (const z of [specimen.min.z, specimen.max.z]) {
        const projected = new Vector3(x, y, z).applyAxisAngle(new Vector3(0, 1, 0), angle).project(camera);
        assert.ok(Math.abs(projected.x) < 1 && Math.abs(projected.y) < 1, `Model cropped at angle ${angle}, aspect ${aspect}`);
      }
    }
  }
});
