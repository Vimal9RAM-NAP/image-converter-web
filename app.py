import io
import streamlit as st
from PIL import Image

st.set_page_config(
    page_title="Image Converter & Compressor", page_icon="img", layout="centered"
)

st.title("Image Converter & Compressor")
st.write(
    "Convert single or multiple images into WEBP, PNG, JPEG, or PDF formats easily."
)

uploaded_files = st.file_uploader(
    "Choose image files",
    type=["png", "jpg", "jpeg", "bmp", "webp"],
    accept_multiple_files=True,
)

if uploaded_files:
    st.subheader("Settings")

    target_format = st.selectbox(
        "Select output format:", ["WEBP", "PNG", "JPEG", "PDF"]
    )

    quality = 85
    if target_format in ["WEBP", "JPEG"]:
        quality = st.slider("Quality / Compression Level:", 10, 100, 85)

    if st.button("Convert Image(s)"):
        st.divider()

        for idx, file in enumerate(uploaded_files):
            image = Image.open(file)
            output_buffer = io.BytesIO()

            if target_format in ["JPEG", "PDF"] and image.mode in (
                "RGBA",
                "P",
                "LA",
            ):
                image = image.convert("RGB")

            if target_format in ["WEBP", "JPEG"]:
                image.save(output_buffer, format=target_format, quality=quality)
            else:
                image.save(output_buffer, format=target_format)

            output_data = output_buffer.getvalue()

            ext = target_format.lower()
            if ext == "jpeg":
                ext = "jpg"
            out_filename = f"converted_{idx+1}.{ext}"

            col1, col2 = st.columns([1, 2])
            with col1:
                st.image(image, use_column_width=True)
            with col2:
                st.write(f"**{file.name}** $\rightarrow$ **{out_filename}**")
                st.download_button(
                    label=f"⬇Download {out_filename}",
                    data=output_data,
                    file_name=out_filename,
                    mime=f"image/{'jpeg' if ext == 'jpg' else ext}",
                    key=f"dl_{idx}",
                )