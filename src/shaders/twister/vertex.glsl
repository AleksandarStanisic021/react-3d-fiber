varying vec2 vUv;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  vUv = uv;
  vLocalPosition = position;
  vNormal = normalize(normalMatrix * normal);
  vViewPosition = -viewPosition.xyz;
}
