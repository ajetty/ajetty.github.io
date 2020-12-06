let canvas;
let gl;

const numPositions = 72;

let positionsArray = [];
let normalsArray = [];

const vertices = [
    vec4(-2, -2,  -2, 1.0),
    vec4(-2,  2,  -2, 1.0),
    vec4(2,  2,  -2, 1.0),
    vec4(2, -2,  -2, 1.0),
    vec4(-2, -2, 2, 1.0),
    vec4(-2,  2, 2, 1.0),
    vec4(2,  2, 2, 1.0),
    vec4(2, -2, 2, 1.0)
];

let lightPosition = vec4(1.0, 1.0, 1.0, 0.0);
let lightAmbient = vec4(0.0, 0.0, 0.0, 1.0);
let lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
let lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

let materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
let materialDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
let materialSpecular = vec4(1.0, 1.0, 1.0, 1.0);
let materialShininess = 100.0;

let modelViewMatrix, projectionMatrix;
let modelViewMatrixLoc, projectionMatrixLoc;
let program;

let near = 0.3;
let far = 8000.0;
let radius = 30.0;
let eyeTheta = 0.0;
let phi = 0.0;

const fovy = 45.0;
let  aspect;
let eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

const xAxis = 0;
const yAxis = 1;
const zAxis = 2;
let axis = 0;
let theta = vec3(0, 0, 0);

let thetaLoc;

let texture;
//let image;
const texSize = 256;

var texCoordsArray = [];

var texCoord = [
    vec2(0, 0),
    vec2(0, 1),
    vec2(1, 1),
    vec2(1, 0),
    vec2(0.5, 0.5)
];


function quad(a, b, c, d) {

    let ac = mix(vertices[a], vertices[c], 0.5)

    if(ac[2] < 0) {
        ac = add(ac, vec4(0.0,0.0,-4.0,0.0))
    }

    if(ac[2] > 0) {
        ac = add(ac, vec4(0.0,0.0,2.0,0.0))
    }

    if(ac[1] < 0) {
        ac = add(ac, vec4(0.0,-7.0,0.0,0.0))
    }

    if(ac[1] > 0) {
        ac = add(ac, vec4(0.0,2.0,0.0,0.0))
    }

    if(ac[0] < 0) {
        ac = add(ac, vec4(-5.0,0.0,0.0,0.0))
    }

    if(ac[0] > 0) {
        ac = add(ac, vec4(3.0,0.0,0.0,0.0))
    }

    const t1 = subtract(vertices[b], vertices[a]);
    const t2 = subtract(ac, vertices[b]);
    let normal1 = cross(t1, t2);
    normal1 = vec3(normal1);

    const t3 = subtract(vertices[c], vertices[b]);
    const t4 = subtract(ac, vertices[c]);
    let normal2 = cross(t3, t4);
    normal2 = vec3(normal2);

    const t5 = subtract(vertices[d], vertices[c]);
    const t6 = subtract(ac, vertices[d]);
    let normal3 = cross(t5, t6);
    normal3 = vec3(normal3);

    const t7 = subtract(vertices[a], vertices[d]);
    const t8 = subtract(ac, vertices[a]);
    let normal4 = cross(t7, t8);
    normal4 = vec3(normal4);

    positionsArray.push(vertices[a]);
    normalsArray.push(normal1);
    positionsArray.push(vertices[b]);
    normalsArray.push(normal1);
    positionsArray.push(ac);
    normalsArray.push(normal1);

    positionsArray.push(vertices[b]);
    normalsArray.push(normal2);
    positionsArray.push(vertices[c]);
    normalsArray.push(normal2);
    positionsArray.push(ac);
    normalsArray.push(normal2);

    positionsArray.push(vertices[c]);
    normalsArray.push(normal3);
    positionsArray.push(vertices[d]);
    normalsArray.push(normal3);
    positionsArray.push(ac);
    normalsArray.push(normal3);

    positionsArray.push(vertices[d]);
    normalsArray.push(normal4);
    positionsArray.push(vertices[a]);
    normalsArray.push(normal4);
    positionsArray.push(ac);
    normalsArray.push(normal4);

    texCoordsArray.push(texCoord[1]);
    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[4]);

    texCoordsArray.push(texCoord[0]);
    texCoordsArray.push(texCoord[3]);
    texCoordsArray.push(texCoord[4]);

    texCoordsArray.push(texCoord[3]);
    texCoordsArray.push(texCoord[2]);
    texCoordsArray.push(texCoord[4]);

    texCoordsArray.push(texCoord[2]);
    texCoordsArray.push(texCoord[1]);
    texCoordsArray.push(texCoord[4]);


}


function createCube()
{
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}

function createImage() {
    //image = new Image();
    let image = document.getElementById("imageTexture")

    texture = gl.createTexture();
    // gl.bindTexture(gl.TEXTURE_2D, texture);
    // gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, image);
    // gl.generateMipmap(gl.TEXTURE_2D);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
        gl.RGB, gl.UNSIGNED_BYTE, image);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
        gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

}


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available");

    aspect =  canvas.width/canvas.height;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    gl.enable(gl.DEPTH_TEST);

    //load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    createCube();

    let nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    let normalLoc = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);

    let vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray), gl.STATIC_DRAW);

    let positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);

    var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
    gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texCoordLoc);

    createImage();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(gl.getUniformLocation( program, "uTexture"), 0);

    let ambientProduct = mult(lightAmbient, materialAmbient);
    let diffuseProduct = mult(lightDiffuse, materialDiffuse);
    let specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "uAmbientProduct"),
        ambientProduct);
    gl.uniform4fv(gl.getUniformLocation(program, "uDiffuseProduct"),
        diffuseProduct );
    gl.uniform4fv(gl.getUniformLocation(program, "uSpecularProduct"),
        specularProduct );
    gl.uniform4fv(gl.getUniformLocation(program, "uLightPosition"),
        lightPosition );

    gl.uniform1f(gl.getUniformLocation(program,
        "uShininess"), materialShininess);

    thetaLoc = gl.getUniformLocation(program, "theta");
    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

    render();
}

//event listener for arrow keys
window.onkeydown = e => {
    switch (e.key) {
        case 'ArrowUp':
            axis = xAxis;
            theta[axis] -= 2.0;
            break;
        case 'ArrowDown':
            axis = xAxis;
            theta[axis] += 2.0;
            break;
        case 'ArrowLeft':
            axis = yAxis;
            theta[axis] += 2.0;
            break;
        case 'ArrowRight':
            axis = yAxis;
            theta[axis] -= 2.0;
            break;
    }
}

function render(){

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    eye = vec3(radius*Math.sin(eyeTheta)*Math.cos(phi),
        radius*Math.sin(eyeTheta)*Math.sin(phi), radius*Math.cos(eyeTheta));
    modelViewMatrix = lookAt(eye, at , up);
    projectionMatrix = perspective(fovy, aspect, near, far);

    modelViewMatrix = mult(modelViewMatrix, rotate(theta[xAxis], vec3(1, 0, 0)));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[yAxis], vec3(0, 1, 0)));
    modelViewMatrix = mult(modelViewMatrix, rotate(theta[zAxis], vec3(0, 0, 1)));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    gl.drawArrays(gl.TRIANGLES, 0, numPositions);

    requestAnimationFrame(render);
}