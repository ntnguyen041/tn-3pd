// // Khởi tạo scene, camera và renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Hàm để tạo hình trái tim 3D
// function createHeart() {
//     const heartShape = new THREE.Shape();

//     // Phương trình trái tim 2D
//     const t = Math.PI / 180;
//     const x = (t) => 16 * Math.sin(t) ** 3;
//     const y = (t) => 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

//     heartShape.moveTo(x(0), y(0));
//     for (let i = 1; i <= 360; i++) {
//         heartShape.lineTo(x(i * t), y(i * t));
//     }

//     // Tạo hình dạng 3D bằng cách extrude
//     const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
//     const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
//     const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
//     const heart = new THREE.Mesh(geometry, material);

//     return heart;
// }

// // Thêm trái tim vào scene
// const heart = createHeart();
// scene.add(heart);

// // Đặt vị trí của camera
// camera.position.z = 50;

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     heart.rotation.x += 0.01;
//     heart.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }

// animate();

// // Xử lý khi thay đổi kích thước cửa sổ
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

//-------------------------------------------------
// Khởi tạo scene, camera và renderer
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Hàm để tạo hình trái tim 3D mềm mại
// function createHeart() {
//     const heartShape = new THREE.Shape();

//     // Phương trình trái tim 2D
//     const t = Math.PI / 180;
//     const x = (t) => 16 * Math.sin(t) ** 3;
//     const y = (t) => 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

//     heartShape.moveTo(x(0), y(0));
//     for (let i = 1; i <= 360; i++) {
//         heartShape.lineTo(x(i * t), y(i * t));
//     }

//     // Tạo hình dạng 3D bằng cách extrude
//     const extrudeSettings = { depth: 4, bevelEnabled: true, bevelSegments: 16, steps: 16, bevelSize: 1, bevelThickness: 2 };
//     const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
//     const material = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
//     const heart = new THREE.Mesh(geometry, material);

//     return heart;
// }

// // Thêm ánh sáng
// const ambientLight = new THREE.AmbientLight(0x404040); // Ánh sáng môi trường
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(50, 50, 50);
// scene.add(pointLight);

// // Thêm trái tim vào scene
// const heart = createHeart();
// scene.add(heart);

// // Đặt vị trí của camera
// camera.position.z = 50;

// // Animation loop
// function animate() {
//     requestAnimationFrame(animate);
//     //heart.rotation.x += 0.01;
//     heart.rotation.y += 0.01;
//     renderer.render(scene, camera);
// }

// animate();

// // Xử lý khi thay đổi kích thước cửa sổ
// window.addEventListener('resize', () => {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// });

// Khởi tạo scene, camera và renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Phương trình parametric của trái tim
function heartFunction(t) {
    const x = 16 * Math.sin(t) ** 3;
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
    const z = 6 * Math.sin(t);
    return new THREE.Vector3(x, y, z);
}

// Tạo hình trái tim 3D
function createHeart() {
    const numPoints = 500;
    const vertices = [];

    for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 * Math.PI;
        const point = heartFunction(t);
        vertices.push(point.x, point.y, point.z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const heart = new THREE.Line(geometry, material);
    return heart;
}

// Thêm ánh sáng
const ambientLight = new THREE.AmbientLight(0x404040); // Ánh sáng môi trường
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

// Thêm trái tim vào scene
const heart = createHeart();
scene.add(heart);

// Đặt vị trí của camera
camera.position.z = 50;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    heart.rotation.y += 0.01; // Xoay nhẹ theo trục y
    renderer.render(scene, camera);
}

animate();

// Xử lý khi thay đổi kích thước cửa sổ
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

