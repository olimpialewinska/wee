import { useCallback } from "react";
import {
  ColorCircle,
  ColorRow,
  ColorRowNoWrap,
  Footer,
  Text,
  UnderlineText,
} from "./style";
import { changeColor } from "@/utils/chatSettings/changeColor";
import { store } from "@/stores";

export function Colors() {
  const changeBackgroundColor = useCallback(
    async (color: string | null) => {
      await changeColor(
        "bgColor",
        store.currentChatStore.currentChatStore?.convId,
        color
      );
    },
    [store.currentChatStore.currentChatStore?.convId]
  );

  const changeMessageColor = useCallback(
    async (color: string | null) => {
      await changeColor(
        "messageColor",
        store.currentChatStore.currentChatStore?.convId,
        color
      );
    },
    [store.currentChatStore.currentChatStore?.convId]
  );
  return (
    <>
      <Text>Background:</Text>
      <ColorRowNoWrap>
        <ColorCircle
          style={{ backgroundColor: "#004045" }}
          onClick={() => changeBackgroundColor("#004045")}
        />
        <ColorCircle
          style={{ backgroundColor: "#002145" }}
          onClick={() => changeBackgroundColor("#002145")}
        />
        <ColorCircle
          style={{ backgroundColor: "#340154" }}
          onClick={() => changeBackgroundColor("#340154")}
        />
        <ColorCircle
          style={{ backgroundColor: "#660047" }}
          onClick={() => changeBackgroundColor("#660047")}
        />
        <ColorCircle
          style={{ backgroundColor: "#450101" }}
          onClick={() => changeBackgroundColor("#450101")}
        />
        <ColorCircle
          style={{ backgroundColor: "#083601" }}
          onClick={() => changeBackgroundColor("#083601")}
        />
      </ColorRowNoWrap>

      <Text style={{ marginTop: 10 }}>Messages:</Text>
      <ColorRow>
        <ColorCircle
          style={{ backgroundColor: "#baae02" }}
          onClick={() => changeMessageColor("#baae02")}
        />
        <ColorCircle
          style={{ backgroundColor: "#b59102" }}
          onClick={() => changeMessageColor("#b59102")}
        />
        <ColorCircle
          style={{ backgroundColor: "#c94a00" }}
          onClick={() => changeMessageColor("#c94a00")}
        />
        <ColorCircle
          style={{ backgroundColor: "#c2021c" }}
          onClick={() => changeMessageColor("#c2021c")}
        />
        <ColorCircle
          style={{ backgroundColor: "#b0027c" }}
          onClick={() => changeMessageColor("#b0027c")}
        />
        <ColorCircle
          style={{ backgroundColor: "#7600ba" }}
          onClick={() => changeMessageColor("#7600ba")}
        />
        <ColorCircle
          style={{ backgroundColor: "#4400d6" }}
          onClick={() => changeMessageColor("#4400d6")}
        />
        <ColorCircle
          style={{ backgroundColor: "#00a1d6" }}
          onClick={() => changeMessageColor("#00a1d6")}
        />
        <ColorCircle
          style={{ backgroundColor: "#00baa4" }}
          onClick={() => changeMessageColor("#00baa4")}
        />
        <ColorCircle
          style={{ backgroundColor: "#02b511" }}
          onClick={() => changeMessageColor("#02b511")}
        />
      </ColorRow>

      <Footer>
        <UnderlineText
          onClick={() => {
            changeBackgroundColor(null);
            changeMessageColor(null);
          }}
        >
          Restore default settings
        </UnderlineText>
      </Footer>
    </>
  );
}
