import cv2

input_path = r"C:\Users\Chait\Downloads\Prime Tech_Intro.mp4"
output_path = r"public\mobile-hero-video.mp4"

cap = cv2.VideoCapture(input_path)
fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

# Target resolution for mobile: max width 720px
scale = 720 / width if width > 720 else 1.0
new_w = int(width * scale)
new_h = int(height * scale)

# Ensure dimensions are even
new_w = new_w if new_w % 2 == 0 else new_w - 1
new_h = new_h if new_h % 2 == 0 else new_h - 1

fourcc = cv2.VideoWriter_fourcc(*'avc1')
out = cv2.VideoWriter(output_path, fourcc, fps, (new_w, new_h))

count = 0
while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    resized = cv2.resize(frame, (new_w, new_h), interpolation=cv2.INTER_AREA)
    out.write(resized)
    count += 1

cap.release()
out.release()
print(f"Compressed {count} frames to {output_path} at {new_w}x{new_h}")
