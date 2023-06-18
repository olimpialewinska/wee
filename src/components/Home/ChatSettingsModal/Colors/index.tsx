import {
  Button,
  ColorCircle,
  ColorRow,
  ColorRowNoWrap,
  Footer,
  Text,
  UnderlineText,
} from "./style";

export function Colors({ convId }: { convId: number | undefined }) {
  return (
    <>
      <Text>Background:</Text>
      <ColorRowNoWrap>
        <ColorCircle style={{ backgroundColor: "#004045" }} />
        <ColorCircle style={{ backgroundColor: "#002145" }} />
        <ColorCircle style={{ backgroundColor: "#340154" }} />
        <ColorCircle style={{ backgroundColor: "#660047" }} />
        <ColorCircle style={{ backgroundColor: "#450101" }} />
        <ColorCircle style={{ backgroundColor: "#083601" }} />
      </ColorRowNoWrap>

      <Text style={{ marginTop: 10 }}>Messages:</Text>
      <ColorRow>
        <ColorCircle style={{ backgroundColor: "#baae02" }} />
        <ColorCircle style={{ backgroundColor: "#b59102" }} />
        <ColorCircle style={{ backgroundColor: "#c94a00" }} />
        <ColorCircle style={{ backgroundColor: "#c2021c" }} />
        <ColorCircle style={{ backgroundColor: "#b0027c" }} />
        <ColorCircle style={{ backgroundColor: "#7600ba" }} />
        <ColorCircle style={{ backgroundColor: "#4400d6" }} />
        <ColorCircle style={{ backgroundColor: "#00a1d6" }} />
        <ColorCircle style={{ backgroundColor: "#00baa4" }} />
        <ColorCircle style={{ backgroundColor: "#02b511" }} />
      </ColorRow>

      <Footer>
        <UnderlineText>Restore default settings</UnderlineText>
        <Button>Save Colors</Button>
      </Footer>
    </>
  );
}
