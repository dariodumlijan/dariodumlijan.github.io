// @flow
export const GENERAL_QUERY = `
  {
    generalCollection {
      items {
        siteTitle
        multiLogo {
          title
          url
        }
        designLogo {
          title
          url
        }
        musicLogo {
          title
          url
        }
        landingQuote
        email
        hire
      }
    }
  }
`;

export const SECTIONS_QUERY = `
  {
    siteSectionsCollection(order: order_ASC) {
      items {
        title
        subtitle
        slug
        img {
          title
          url
        }
        gif {
          title
          url
        }
      }
    }
  }
`;

export const LANDING_QUERY = `
  {
    generalCollection {
      items {
        multiLogo {
          title
          url
        }
        landingQuote
        email
        hire
      }
    }
    siteSectionsCollection(order: order_ASC) {
      items {
        title
        subtitle
        slug
        img {
          title
          url
        }
        gif {
          title
          url
        }
      }
    }
  }
`;
