FROM python:3.11-slim AS map-builder
WORKDIR /src
RUN apt-get update && apt-get install -y \
    texlive-full \
    python3-pygments \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir folium osmnx matplotlib pillow

COPY namibia.tex .
COPY images ./images

# Run pythontex to generate maps
RUN mkdir -p pythontex-files-namibia && \
    pdflatex -shell-escape namibia.tex || true && \
    pythontex namibia.tex || true && \
    pdflatex -shell-escape namibia.tex || true

FROM pandoc/latex:3.1 AS html-builder
WORKDIR /src
COPY --from=map-builder /src /src
RUN mkdir -p /out && \
    pandoc namibia.tex \
      -s \
      -o /out/index.html \
      --metadata title="Namibia Trip" \
      --mathjax && \
    if [ -d "images" ]; then cp -r images /out/images; fi && \
    if [ -d "pythontex-files-namibia" ]; then cp -r pythontex-files-namibia /out/; fi

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=html-builder /out /usr/share/nginx/html
