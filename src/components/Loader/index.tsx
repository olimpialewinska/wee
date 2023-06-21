import { LoaderContainer, Spinner } from "./style";

export function Loader({ color }: { color: string }) {
  return (
    <LoaderContainer>
      <Spinner
        style={{
          borderColor: `${color} transparent ${color} transparent`,
        }}
      />
    </LoaderContainer>
  );
}
