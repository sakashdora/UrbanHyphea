import { Box3, MathUtils, Vector3 } from 'three';

/** Fit all eight corners in camera space without letting the ground shadow shrink the specimen. */
export function getFramingDistance(bounds: Box3, direction: Vector3, verticalFov: number, aspect: number): number {
  const center = bounds.getCenter(new Vector3());
  const forward = direction.clone().normalize();
  const right = new Vector3().crossVectors(new Vector3(0, 1, 0), forward).normalize();
  const up = new Vector3().crossVectors(forward, right).normalize();
  const tangentY = Math.tan(MathUtils.degToRad(verticalFov / 2));
  const tangentX = tangentY * Math.max(aspect, 0.01);
  let distance = 0;
  for (const x of [bounds.min.x, bounds.max.x]) {
    for (const y of [bounds.min.y, bounds.max.y]) {
      for (const z of [bounds.min.z, bounds.max.z]) {
        const offset = new Vector3(x, y, z).sub(center);
        distance = Math.max(distance,
          offset.dot(forward) + Math.abs(offset.dot(right)) / tangentX,
          offset.dot(forward) + Math.abs(offset.dot(up)) / tangentY);
      }
    }
  }
  return Math.max(distance * 1.1, 0.1);
}

/** Fit the actual rotating corners, rather than the much larger enclosing cube. */
export function getRotatingFramingDistance(bounds: Box3, direction: Vector3, verticalFov: number, aspect: number, maxAngle: number): number {
  const center = new Vector3(0, (bounds.min.y + bounds.max.y) / 2, 0);
  const forward = direction.clone().normalize();
  const right = new Vector3().crossVectors(new Vector3(0, 1, 0), forward).normalize();
  const up = new Vector3().crossVectors(forward, right).normalize();
  const tangentY = Math.tan(MathUtils.degToRad(verticalFov / 2));
  const tangentX = tangentY * Math.max(aspect, 0.01);
  const axis = new Vector3(0, 1, 0);
  let distance = 0;
  for (let step = 0; step <= 24; step++) {
    const angle = maxAngle * step / 24;
    for (const x of [bounds.min.x, bounds.max.x]) for (const y of [bounds.min.y, bounds.max.y]) for (const z of [bounds.min.z, bounds.max.z]) {
      const point = new Vector3(x, y, z).applyAxisAngle(axis, angle).sub(center);
      distance = Math.max(distance, point.dot(forward) + Math.abs(point.dot(right)) / tangentX, point.dot(forward) + Math.abs(point.dot(up)) / tangentY);
    }
  }
  return Math.max(distance * 1.1, 0.1);
}

/**
 * Distance needed to keep a Y-spinning specimen fully in frame. The footprint is treated as a
 * cylinder (radius = widest horizontal reach), which is tighter than boxing the rotation's corners.
 */
export function getCylinderFramingDistance(
  radius: number,
  minY: number,
  maxY: number,
  target: Vector3,
  direction: Vector3,
  verticalFov: number,
  aspect: number,
  margin = 1.04
): number {
  const forward = direction.clone().normalize();
  const right = new Vector3().crossVectors(new Vector3(0, 1, 0), forward).normalize();
  const up = new Vector3().crossVectors(forward, right).normalize();
  const tangentY = Math.tan(MathUtils.degToRad(verticalFov / 2));
  const tangentX = tangentY * Math.max(aspect, 0.01);
  let distance = 0;
  for (let step = 0; step < 48; step++) {
    const angle = (step / 48) * Math.PI * 2;
    for (const y of [minY, maxY]) {
      const offset = new Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius).sub(target);
      distance = Math.max(
        distance,
        offset.dot(forward) + Math.abs(offset.dot(right)) / tangentX,
        offset.dot(forward) + Math.abs(offset.dot(up)) / tangentY
      );
    }
  }
  return Math.max(distance * margin, 0.1);
}
