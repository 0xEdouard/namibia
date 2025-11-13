FROM pandoc/latex:3.1 AS builder
WORKDIR /src
COPY namibia.tex .
COPY images ./images
RUN mkdir -p /out && \
    pandoc namibia.tex \
      -s \
      -o /out/index.html \
      --metadata title="Namibia Trip" \
      --mathjax \
      --css=https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css \
      --variable maxwidth=1200px && \
    if [ -d "images" ]; then cp -r images /out/images; fi

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /out /usr/share/nginx/html
