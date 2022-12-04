import { Action, ActionPanel, Grid } from "@raycast/api";
import { useState } from "react";

import { useFetch } from "@raycast/utils";

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
                <Action title="Select" onAction={() => setSearchText(item.prompt)} />
              </ActionPanel>
            }
          />
        ))}
      </Grid>
    )
  );
}
