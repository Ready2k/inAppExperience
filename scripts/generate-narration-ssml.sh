#!/usr/bin/env bash
# =============================================================================
# generate-narration-ssml.sh
# Generates MP3 narration audio for all three demo modes (today / future / compare).
# Output: public/narration/{mode}/scene{0-7}.mp3
# At runtime the app loads /narration/{demoMode}/scene{N}.mp3 and falls back to
# Web Speech API if the file is absent.
# =============================================================================

set -euo pipefail

VOICE_ID="Amy"
ENGINE="neural"
OUTPUT_FORMAT="mp3"
LANGUAGE_CODE="en-GB"
SAMPLE_RATE="24000"
REGION="${AWS_DEFAULT_REGION:-eu-west-1}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BASE_DIR="$SCRIPT_DIR/../public/narration"

echo ""
echo "  inAppExperience — Narration Generator"
echo "  ──────────────────────────────────────"
echo ""

if ! command -v aws &>/dev/null; then
  echo "  ERROR: AWS CLI not found. Install from https://aws.amazon.com/cli/"
  exit 1
fi

echo "  AWS CLI:   $(aws --version 2>&1 | head -1)"
echo "  Voice:     $VOICE_ID ($ENGINE engine, $LANGUAGE_CODE)"
echo "  Format:    $OUTPUT_FORMAT @ ${SAMPLE_RATE}Hz"
echo "  Region:    $REGION"
echo "  Output:    $BASE_DIR/{today,future,compare}/"
echo ""

if ! aws polly describe-voices --region "$REGION" --engine "$ENGINE" \
     --language-code "$LANGUAGE_CODE" --output text &>/dev/null; then
  echo "  ERROR: Cannot reach Amazon Polly in region $REGION."
  echo "  Check your AWS credentials and that the region supports Neural voices."
  exit 1
fi

mkdir -p "$BASE_DIR/today" "$BASE_DIR/future" "$BASE_DIR/compare"

synthesize() {
  local mode="$1"
  local scene_num="$2"
  local text="$3"
  local out="$BASE_DIR/${mode}/scene${scene_num}.mp3"

  echo "  [${mode}/scene${scene_num}] Synthesising ..."

  aws polly synthesize-speech \
    --region          "$REGION"        \
    --output-format   "$OUTPUT_FORMAT" \
    --voice-id        "$VOICE_ID"      \
    --engine          "$ENGINE"        \
    --language-code   "$LANGUAGE_CODE" \
    --sample-rate     "$SAMPLE_RATE"   \
    --text-type       "ssml"           \
    --text            "$text"          \
    "$out"

  local size
  size=$(du -h "$out" | cut -f1)
  echo "         ✓  Saved  ($size)"
}

# ─────────────────────────────────────────────────────────────────────────────
# TODAY — legacy PSTN, customer does all the work
# ─────────────────────────────────────────────────────────────────────────────

echo "  ── TODAY ─────────────────────────────────────────────────────────────"

synthesize today 0 '<speak>
<prosody rate="91%">Scene one.</prosody>
<break time="350ms"/>
<prosody rate="91%">The customer is reviewing their recent card activity.</prosody>
<break time="400ms"/>
<prosody rate="91%">They spot a transaction they do not recognise — but for now, they are on their own to find a solution.</prosody>
</speak>'

synthesize today 1 '<speak>
<prosody rate="91%">Scene two.</prosody>
<break time="350ms"/>
<prosody rate="91%">Today, resolving an issue means navigating support menus and finding numbers.</prosody>
<break time="400ms"/>
<prosody rate="91%">The app does not know what you are looking for.</prosody>
</speak>'

synthesize today 2 '<speak>
<prosody rate="91%">Scene three.</prosody>
<break time="350ms"/>
<prosody rate="91%">Choosing to call often means leaving the banking app entirely.</prosody>
<break time="400ms"/>
<prosody rate="91%">The session is broken, and the wait begins.</prosody>
</speak>'

synthesize today 3 '<speak>
<prosody rate="91%">Scene four.</prosody>
<break time="350ms"/>
<prosody rate="91%">The phone call starts with basic security questions.</prosody>
<break time="400ms"/>
<prosody rate="91%">You have to prove who you are, even though you were just in the secure app.</prosody>
</speak>'

synthesize today 4 '<speak>
<prosody rate="91%">Scene five.</prosody>
<break time="350ms"/>
<prosody rate="91%">Traditional calls are voice-only.</prosody>
<break time="350ms"/>
<prosody rate="91%">You cannot see what the agent sees, and they cannot show you the data easily.</prosody>
</speak>'

synthesize today 5 '<speak>
<prosody rate="91%">Scene six.</prosody>
<break time="350ms"/>
<prosody rate="91%">Most current AI can only tell you what to do.</prosody>
<break time="400ms"/>
<prosody rate="91%">You still have to do the work yourself.</prosody>
</speak>'

synthesize today 6 '<speak>
<prosody rate="91%">Scene seven.</prosody>
<break time="350ms"/>
<prosody rate="91%">Handing over to a human usually means a cold transfer.</prosody>
<break time="400ms"/>
<prosody rate="91%">You repeat your name, your issue, and what you have already tried.</prosody>
</speak>'

synthesize today 7 '<speak>
<prosody rate="91%">Scene eight.</prosody>
<break time="350ms"/>
<prosody rate="91%">The legacy world is built on <sub alias="P S T N">PSTN</sub> voice — isolated from data.</prosody>
<break time="400ms"/>
<prosody rate="91%">It is expensive, opaque, and fragmented.</prosody>
</speak>'

# ─────────────────────────────────────────────────────────────────────────────
# FUTURE — AI-native in-app WebRTC experience
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "  ── FUTURE ────────────────────────────────────────────────────────────"

synthesize future 0 '<speak>
<prosody rate="91%">Scene one.</prosody>
<break time="350ms"/>
<prosody rate="91%">As soon as the customer views their activity, the AI-native experience highlights the suspicious spend</prosody>
<break time="300ms"/>
<prosody rate="91%">and offers an immediate, contextual route to resolution.</prosody>
</speak>'

synthesize future 1 '<speak>
<prosody rate="91%">Scene two.</prosody>
<break time="350ms"/>
<prosody rate="91%">In the future, support is not a destination — it is a capability that lives where the problem is.</prosody>
<break time="400ms"/>
<prosody rate="91%">One tap starts the journey with full context.</prosody>
</speak>'

synthesize future 2 '<speak>
<prosody rate="91%">Scene three.</prosody>
<break time="350ms"/>
<prosody rate="91%">Tapping Talk to AI starts a secure <sub alias="Web R T C">WebRTC</sub> voice session instantly.</prosody>
<break time="400ms"/>
<prosody rate="91%">No dialers, no menus, no wait.</prosody>
</speak>'

synthesize future 3 '<speak>
<prosody rate="91%">Scene four.</prosody>
<break time="350ms"/>
<prosody rate="91%">Because the call is initiated inside the authenticated app, a trusted <sub alias="D T M F">DTMF</sub> key confirms identity automatically.</prosody>
<break time="400ms"/>
<prosody rate="91%">No security questions, no <sub alias="I V R">IVR</sub>.</prosody>
<break time="300ms"/>
<prosody rate="91%">The session carries forward instantly.</prosody>
</speak>'

synthesize future 4 '<speak>
<prosody rate="91%">Scene five.</prosody>
<break time="350ms"/>
<prosody rate="91%">This is the multimodal copilot.</prosody>
<break time="350ms"/>
<prosody rate="91%">While you speak, the AI surfaces interactive cards and data on-screen,</prosody>
<break time="300ms"/>
<prosody rate="91%">combining the speed of voice with the clarity of <sub alias="U I">UI</sub>.</prosody>
</speak>'

synthesize future 5 '<speak>
<prosody rate="91%">Scene six.</prosody>
<break time="350ms"/>
<prosody rate="91%">The future AI is executional.</prosody>
<break time="350ms"/>
<prosody rate="91%">It can freeze the card, block the merchant, and start the dispute journey — all during the conversation.</prosody>
</speak>'

synthesize future 6 '<speak>
<prosody rate="91%">Scene seven.</prosody>
<break time="350ms"/>
<prosody rate="91%">When the specialist joins, they do not start from zero.</prosody>
<break time="400ms"/>
<prosody rate="91%">They arrive with a full context package — the transcript, the actions taken, and the exact reason for the call.</prosody>
</speak>'

synthesize future 7 '<speak>
<prosody rate="91%">Scene eight.</prosody>
<break time="350ms"/>
<prosody rate="91%">The future is <sub alias="Web R T C">WebRTC</sub> and data.</prosody>
<break time="350ms"/>
<prosody rate="91%">Every conversation is a data stream — rich, observable, and integrated into the core banking platform.</prosody>
</speak>'

# ─────────────────────────────────────────────────────────────────────────────
# COMPARE — delta insight narration for side-by-side view
# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "  ── COMPARE ───────────────────────────────────────────────────────────"

synthesize compare 0 '<speak>
<prosody rate="91%">Scene one. On the left, the customer searches manually.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, the AI flags the suspicious charge instantly — before the customer has to look.</prosody>
</speak>'

synthesize compare 1 '<speak>
<prosody rate="91%">Scene two. On the left, menu hunting.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, contextual entry — support lives exactly where the problem is.</prosody>
</speak>'

synthesize compare 2 '<speak>
<prosody rate="91%">Scene three. On the left, the customer dials out and waits.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, one tap starts a secure <sub alias="Web R T C">WebRTC</sub> session — the app never loses context.</prosody>
</speak>'

synthesize compare 3 '<speak>
<prosody rate="91%">Scene four. On the left, re-authenticate from scratch.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, persistent trust — the in-app session is already verified.</prosody>
</speak>'

synthesize compare 4 '<speak>
<prosody rate="91%">Scene five. On the left, voice only.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, voice plus a co-pilot <sub alias="U I">UI</sub> — data and conversation, combined.</prosody>
</speak>'

synthesize compare 5 '<speak>
<prosody rate="91%">Scene six. On the left, instructional AI — it tells you what to do.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, executional AI — it acts.</prosody>
</speak>'

synthesize compare 6 '<speak>
<prosody rate="91%">Scene seven. On the left, a cold transfer — start from scratch.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, full context luggage — the specialist arrives ready.</prosody>
</speak>'

synthesize compare 7 '<speak>
<prosody rate="91%">Scene eight. On the left, legacy <sub alias="P S T N">PSTN</sub> — opaque and fragmented.</prosody>
<break time="400ms"/>
<prosody rate="91%">On the right, <sub alias="Web R T C">WebRTC</sub> and data — every conversation is observable.</prosody>
</speak>'

# ─────────────────────────────────────────────────────────────────────────────

echo ""
echo "  ✓  All narration files generated:"
echo ""
for mode in today future compare; do
  echo "  $mode/"
  for f in "$BASE_DIR/$mode"/*.mp3; do
    [ -f "$f" ] && printf "     %-40s  %s\n" "$(basename "$f")" "$(du -h "$f" | cut -f1)"
  done
done
echo ""
echo "  Files are served from /narration/{mode}/scene{N}.mp3"
echo "  by the Vite dev server and bundled by npm run build."
echo ""
