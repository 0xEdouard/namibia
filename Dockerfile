FROM python:3.11-slim AS map-builder
WORKDIR /src
RUN pip install --no-cache-dir folium

COPY generate_maps.py .
COPY images ./images
RUN python3 generate_maps.py

FROM pandoc/latex:3.1 AS html-builder
WORKDIR /src
COPY --from=map-builder /src/images ./images
COPY namibia.tex .

RUN mkdir -p /out && \
    pandoc namibia.tex \
      -s \
      -o /out/index.html \
      --metadata title="Namibia Trip" \
      --mathjax && \
    cp -r images /out/images

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=html-builder /out /usr/share/nginx/html
