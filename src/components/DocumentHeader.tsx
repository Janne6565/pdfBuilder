interface DocumentHeaderProps {
  header: string;
}


function DocumentHeader(props: DocumentHeaderProps) {
  return (
    <header>
      <h1>Berechnungs Tool</h1>
      <h2>{props.header}</h2>
      <br />
    </header>
  );
}

export default DocumentHeader;
