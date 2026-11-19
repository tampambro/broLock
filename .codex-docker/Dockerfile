FROM node:24-bookworm

RUN apt-get update \
  && apt-get install -y --no-install-recommends git gosu \
  && rm -rf /var/lib/apt/list/*

RUN npm install -g @openai/codex

WORKDIR /workspace

COPY .codex-docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["sleep", "infinity"]
