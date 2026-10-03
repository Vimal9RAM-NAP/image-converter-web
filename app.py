import io
from flask import Flask, render_template, request, send_file
from PIL import Image

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/convert", methods=["POST"])
def convert_image():
    if "file" not in request.files:
        return "No file uploaded", 400

    file = request.files["file"]
    target_format = request.form.get("format", "WEBP").upper()
    quality = int(request.form.get("quality", 85))

    if file.filename == "":
        return "No selected file", 400

    try:
        image = Image.open(file.stream)
        output_buffer = io.BytesIO()

        # RGB conversion for transparency-unsupported formats
        if target_format in ["JPEG", "PDF"] and image.mode in (
            "RGBA",
            "P",
            "LA",
        ):
            image = image.convert("RGB")

        # Format saving
        if target_format in ["WEBP", "JPEG"]:
            image.save(output_buffer, format=target_format, quality=quality)
        else:
            image.save(output_buffer, format=target_format)

        output_buffer.seek(0)

        ext = "jpg" if target_format.lower() == "jpeg" else target_format.lower()
        download_name = f"converted.{ext}"
        mime_type = "image/jpeg" if ext == "jpg" else f"image/{ext}"

        return send_file(
            output_buffer,
            mimetype=mime_type,
            as_attachment=True,
            download_name=download_name,
        )

    except Exception as e:
        return f"Error processing image: {str(e)}", 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)