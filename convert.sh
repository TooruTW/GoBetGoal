#!/bin/bash

# 原始資料夾
INPUT_DIR="/Users/chenyixuan/Documents/程式/front/project/GoBetGoal/GoBetGoal/public/animation"
# 轉換後輸出資料夾
OUTPUT_DIR="/Users/chenyixuan/Documents/程式/front/project/GoBetGoal/GoBetGoal/public/animation_hevc"

# 遞迴搜尋所有 .webm
find "$INPUT_DIR" -type f -name "*.webm" | while read -r FILE; do
  # 相對路徑
  REL_PATH="${FILE#$INPUT_DIR/}"
  # 輸出檔案路徑（副檔名換成 mp4）
  OUT_FILE="$OUTPUT_DIR/${REL_PATH%.webm}.mp4"

  # 建立對應的資料夾
  mkdir -p "$(dirname "$OUT_FILE")"

  echo "轉換中: $FILE → $OUT_FILE"

  # 使用 ffmpeg 轉成 HEVC + alpha
  ffmpeg -i "$FILE" -c:v libx265 -pix_fmt yuv420p -crf 18 -tag:v hvc1 "$OUT_FILE"

done
