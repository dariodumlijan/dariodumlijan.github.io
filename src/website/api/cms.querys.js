import { gql } from "@apollo/client";

export const WEB_SETTINGS = gql`
  {
    vijestiPostavkeCollection {
      items {
        more
        limit
      }
    }
    listicPostavkeCollection {
      items {
        more
        hide
        limit
        max
      }
    }
    galerijaCollection {
      items {
        followText
      }
    }
  }
`;

export const NAV_QUERY = gql`
  {
    generalCollection {
      items {
        nazivStranice
        misaoDana
        bojeStranice
      }
    }
    straniceCollection {
      items {
        sys {
          id
        }
        navPage
        stranicaUrl
        order
        parent {
          sys {
            id
          }
        }
      }
    }
  }
`;

export const SIDE_QUERY = gql`
  {
    generalCollection {
      items {
        logo {
          title
          url
        }
      }
    }
    sidebarCollection {
      items {
        obavijesti
        raspored {
          json
        }
      }
    }
    sidebarLinksCollection {
      items {
        pageName
        pageUrl
        index
      }
    }
  }
`;

export const HOME_QUERY = gql`
  {
    homepageCollection {
      items {
        slideshowCollection(limit: 4) {
          items {
            title
            url
          }
        }
        selaNaslov
        sela
        bitneStraniceNaslov
        bitneStraniceCollection(limit: 10) {
          items {
            title
            description
            url
          }
        }
        korisniLinkoviNaslov
        korisniLinkovi
        korisniLinkoviUrl
        najnovijeVijestiNaslov
        zupniListicNaslov
      }
    }
    vijestiCollection(limit: 3, order: datumObjave_DESC) {
      items {
        slika {
          title
          url
        }
        naslov
        url
        datumObjave
        content {
          json
        }
      }
    }
    zupniListicCollection(limit: 1, order: date_DESC) {
      items {
        naslov
        pagesCollection {
          items {
            url
          }
        }
      }
    }
  }
`;

export const STATS_QUERY = gql`
  {
    statistikaCollection {
      items {
        statistikaPdfCollection {
          items {
            title
            url
          }
        }
        repeater
      }
    }
  }
`;

export const CONTACT_QUERY = gql`
  {
    contactCollection {
      items {
        naslov
        details {
          json
        }
      }
    }
  }
`;

export const BOTTOM_QUERY = gql`
  {
    bottomCollection {
      items {
        kontaktNaslov
        kontaktDetalji
        drustveneMrezeNaslov
        drustveneMrezeUrl
      }
    }
  }
`;

export const FOOT_QUERY = gql`
  {
    generalCollection {
      items {
        nazivStranice
      }
    }
  }
`;
