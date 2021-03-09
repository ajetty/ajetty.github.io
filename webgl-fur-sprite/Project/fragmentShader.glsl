#version 300 es
precision mediump float;

uniform vec4 uAmbientProduct;
uniform vec4 uDiffuseProduct;
uniform vec4 uSpecularProduct;
uniform float uShininess;

uniform sampler2D uBaseTexture;
uniform sampler2D uFurTexture;

in vec3 N, L, E;
in vec2 vTexCoord;
in float vCurrentLayer;

out vec4 fColor;

void main()
{
    vec3 H = normalize( L + E );
    vec4 ambient = uAmbientProduct;

    float Kd = max( dot(L, N), 0.0 );
    vec4  diffuse = Kd * uDiffuseProduct;

    vec4 baseColor = texture(uFurTexture,vTexCoord);

    //vec4 diffuseCombine = (diffuse + ambient) * texture(uFurTexture,vTexCoord);
    vec4 diffuseCombine = (diffuse + ambient) * baseColor;

    float Ks = pow( max(dot(N, H), 0.0), uShininess );
    vec4  specular = Ks * uSpecularProduct;

    if( dot(L, N) < 0.0 )
        specular = vec4(0.0, 0.0, 0.0, 1.0);

    vec4 vColor = diffuseCombine + specular;
    //vec4 vColor = vec4(0.5, 0.0, 0.0, 1);
    //vColor.a = (vCurrentLayer == 0.0) ? 1.0 : texture(uBaseTexture,vTexCoord).r - vCurrentLayer;
    vColor.a = (vCurrentLayer == 0.0) ? 1.0 : max((texture(uBaseTexture,vTexCoord).r - vCurrentLayer), 0.0);
    //vColor.a = texture(uBaseTexture,vTexCoord).r;


    fColor = vColor;
    //fColor = vec4(vTexCoord.x,vTexCoord.y,0,1);
}