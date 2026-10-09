uniform float uTime;
uniform float uImpact;

varying vec2 vUv;
varying vec3 vLocalPosition;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  float flow = vLocalPosition.x * 2.8
    - uTime * 7.0
    + sin(vLocalPosition.y * 9.0 + uTime * 2.4) * 1.1
    + sin(vLocalPosition.z * 8.0 - uTime * 1.8) * 0.8;
  float bands = pow(0.5 + 0.5 * sin(flow), 12.0);
  float travelingPulse = pow(
    max(0.0, cos(vLocalPosition.x * 1.35 - uTime * 4.0)),
    18.0
  );
  float lengthGradient = smoothstep(-6.0, 6.0, vLocalPosition.x);
  float fresnel = pow(
    1.0 - max(dot(normalize(vNormal), normalize(vViewPosition)), 0.0),
    2.0
  );

  vec3 deepBlue = vec3(0.008, 0.015, 0.12);
  vec3 violet = vec3(0.32, 0.025, 0.95);
  vec3 cyan = vec3(0.0, 0.85, 1.0);
  vec3 color = mix(deepBlue, violet, 0.35 + lengthGradient * 0.4);
  color += cyan * bands * 1.8;
  color += vec3(0.65, 0.9, 1.0) * travelingPulse * 1.5;
  color += mix(violet, cyan, lengthGradient) * fresnel * 1.4;
  color += cyan * uImpact * 1.8;
  color = mix(color, vec3(1.0), clamp(uImpact * 0.55, 0.0, 0.9));

  gl_FragColor = vec4(color, 1.0);
}
