import React from 'react';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getComponent } from '@stackbit/components';

function Page(props) {
    const { page, site } = props;
    const { layout } = page;
      const response = await fetch(
    "https://graphql1f.steprz.net/api/1fec739d90f6028c74a6f19855c34277/__graphql",

    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query: `query MyQuery ($github_token: Secret! $twitter_bearerToken: Secret!, $username: String! ) {
        devto_getArticles(username: $username, top: 3) {
          title
          published_at
          user {
            github_details(github_token: $github_token) {
              pinnedItems(first: 3) {
                nodes {
                  ... on Github_Repository {
                    id
                    name
                    description
                  
                  }
                }
              }
            }
        
            twitter_details(
              twitter_bearerToken: $twitter_bearerToken
            ) {
              pinned_tweet(
                twitter_bearerToken: $twitter_bearerToken
              ) {
                text
              }
            }
            github_username
            username
            twitter_username
          }
        }
      } 
      `,
        variables: {
          github_token: github_token,
          twitter_bearerToken: twitter_bearerToken,
          username: username,
        },
      }),
    }
  );

  let data = await response.json();

  return res.status(200).json({ data: data });

    if (!layout) {
        throw new Error(`page has no layout, page '${props.path}'`);
    }
    const PageLayout = getComponent(layout);
    if (!PageLayout) {
        throw new Error(`no page layout matching the layout: ${layout}`);
    }
    return <PageLayout page={page} site={site} />;
}

export async function getStaticPaths() {
    let data = await sourcebitDataClient.getData();
    const paths = data.pages.map((page) => page.path);
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const props = await sourcebitDataClient.getStaticPropsForPageAtPath(params.slug);
    return { props };
}

export default withRemoteDataUpdates(Page);
