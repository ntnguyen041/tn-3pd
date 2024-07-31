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

// Tạo canvas và texture cho văn bản
function createTextSprite(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = 'bold 24px Arial';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Đo kích thước của văn bản
    const textWidth = context.measureText(text).width;
    canvas.width = textWidth + 20; // Thêm chút khoảng cách
    canvas.height = 40; // Chiều cao của canvas

    // Vẽ văn bản lên canvas
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    
    return sprite;
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

// Thêm văn bản vào scene
const textSprite = createTextSprite('Tôi yêu em');
textSprite.position.set(0, -20, 0); // Đặt chữ dưới trái tim
scene.add(textSprite);

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



var index =0;
var text =document.getElementById('text');
var shadow ='';
for(var i =0;i<10;i++){
    shadow+=(shadow?',':'')+-i*1+'px '+i*1+'px 0 #f75555';
}
text.style.textShadow =shadow;
var inter = setInterval(settext,100);
textname ='TN <3 PD';
text2namne='';
function settext(){
    if(index>8){
        index=0;
    }
    else{
        text2name = textname.slice(0,index);
    }
    index++;          
    text.setAttribute("data-text", text2name);
    text.innerHTML=text2name;
}