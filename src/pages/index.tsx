import Header from "@cloudscape-design/components/header";
import Container from "@cloudscape-design/components/container";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Input from "@cloudscape-design/components/input";
import Button from "@cloudscape-design/components/button";
import CodeView from "@cloudscape-design/code-view/code-view";
import Form from "@cloudscape-design/components/form";
import Avatar from "@cloudscape-design/chat-components/avatar";
import { useCompletion } from "ai/react";

export default function Home() {
  const { completion, input, setInput, handleSubmit, isLoading, error, stop } =
    useCompletion({
      api: "/api/hello",
      streamProtocol: 'data',
    });

  return (
    <SpaceBetween size="m">
      <Header variant="h1">AI example</Header>

      <Container>
        <SpaceBetween size="m" direction="horizontal">
          <Avatar
            ariaLabel="Avatar of generative AI assistant"
            color="gen-ai"
            iconName="gen-ai"
            tooltipText="Generative AI assistant"
          />
          <CodeView content={completion} />
        </SpaceBetween>
      </Container>

      <form onSubmit={handleSubmit}>
        <Form
          actions={
            <SpaceBetween direction="horizontal" size="xs">
              <Button variant="primary">Submit</Button>
            </SpaceBetween>
          }
          errorText={error?.message}
        >
          <Container>
            <Input
              onChange={({ detail }) => setInput(detail.value)}
              value={input}
              placeholder="prompt"
            />
          </Container>
          <Button onClick={stop}>stop</Button>
        </Form>
      </form>
    </SpaceBetween>
  );
}
