import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { copyFileToClipboard } from "./utils";

interface Image {
  id: string;
  gallery: string;
  src: string;
  srcSmall: string;
  prompt: string;
  width: number;
  height: number;
  seed: string;
  grid: boolean;
  model: string;
  guidances: number;
  promptId: string;
  nsfw: boolean;
}

export default function Command() {
  const [searchText, setSearchText] = useState<string>("beatiful scenery");
  const { isLoading, data } = useFetch(`https://lexica.art/api/v1/search?q=${searchText}`, {});

  return (
    data && (
      <Grid
        searchText={searchText}
        onSearchTextChange={setSearchText}
        navigationTitle="Results"
        searchBarPlaceholder="Search generated images"
        isLoading={isLoading}
        throttle={true}
      >
        {data.images.map((item: Image) => (
          <Grid.Item
            key={item.id}
            content={item.src}
            actions={
              <ActionPanel>
                <Action
                  icon={Icon.MagnifyingGlass}
                  title="Search based on this prompt"
                  onAction={() => setSearchText(item.prompt)}
                />
                <Action
                  title="Copy to Clipboard"
                  icon={Icon.Clipboard}
                  shortcut={{ modifiers: ["cmd", "opt"], key: "c" }}
                  onAction={() => copyFileToClipboard(item.src, item.id)}
                />
                <Action.OpenInBrowser title="Open in browser" url={item.src} />
              </ActionPanel>
            }
          />
        ))}
      </Grid>
    )
  );
}
