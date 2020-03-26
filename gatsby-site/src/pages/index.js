import React from "react"
import { Link, graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        allNodeArticle {
          edges {
            node {
              title
              body {
                value
              }
              path {
                alias
              }
              created
              relationships {
                field_image {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 400, quality: 100) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {data.allNodeArticle.edges.map(edge => (
          <>
            <h3>
              <Link to={edge.node.path.alias}>{edge.node.title}</Link>
            </h3>
            <small>
              <em>{Date(edge.node.created)}</em>
            </small>
            <div
              style={{
                maxWidth: `200px`,
                marginBottom: `1.45rem`,
                width: `100%`,
              }}
            >
              <Img
                fluid={
                  edge.node.relationships.field_image.localFile.childImageSharp
                    .fluid
                }
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: edge.node.body.value + " ____________________ ",
              }}
            ></div>
          </>
        ))}
        <Link to="/page-2/">Go to page 2</Link>
      </Layout>
    )}
  />
)

export default IndexPage
