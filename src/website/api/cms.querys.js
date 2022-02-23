// @flow
export const HOME_QUERY = (section: string): string => `
  {
    featuredCollection(limit: 2, order: order_ASC, where: {sectionName: "${section}"}) {
      items {
        sys {
          id
        }
        title
        links
        description
        img {
          url
          title
        }
        audioCollection {
          items {
            url
            title
          }
        }
      }
    }
  }`;

export const ABOUT_QUERY = (section: string): string => `
  {
    aboutCollection(where: {sectionName: "${section}"}) {
      items {
        title
        subtitle
        description
        img {
          title
          url
        }
        cv {
          title
          url
        }
      }
    }
    aboutTabsCollection(where: {sectionName: "${section}"}, order: order_ASC) {
      items {
        title
        description {
          json
        }
      }
    }
  }`;

export const PORTFOLIO_QUERY = (section: string): string => {
  const sections: { design: string, music: string } = {
    design: `{
      designCollection {
        items {
          coverArt {
            title
            url
          }
          title
          role
          client
          links
          description {
            json
          }
          mockupsCollection {
            items {
              title
              url
            }
          }
        }
      }
    }`,
    music: `{
      productionCollection {
        items {
          coverArt {
            title
            url
          }
          filter
          title
          artist
          description {
            json
          }
          video
          audioCollection {
            items {
              title
              url
            }
          }
        }
      }
    }`,
  };

  return sections[section];
};

export const SHOWREEL_QUERY: string = `
  {
    showreelCollection(limit: 1) {
      items {
        video
        title
        artist
        description {
          json
        }
      }
    }
  }`;
