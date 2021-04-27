import React from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Copied in order to fix Authorization button layout
// See https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/layouts/base.jsx
class CustomLayout extends React.Component {
  render() {
    let { errSelectors, specSelectors, getComponent } = this.props;

    let SvgAssets = getComponent('SvgAssets');
    let InfoContainer = getComponent('InfoContainer', true);
    let VersionPragmaFilter = getComponent('VersionPragmaFilter');
    let Operations = getComponent('operations', true);
    let Models = getComponent('Models', true);
    let Row = getComponent('Row');
    let Col = getComponent('Col');
    let Errors = getComponent('errors', true);

    const ServersContainer = getComponent('ServersContainer', true);
    const SchemesContainer = getComponent('SchemesContainer', true);
    const AuthorizeBtnContainer = getComponent('AuthorizeBtnContainer', true);
    const FilterContainer = getComponent('FilterContainer', true);
    let isSwagger2 = specSelectors.isSwagger2();
    let isOAS3 = specSelectors.isOAS3();

    const isSpecEmpty = !specSelectors.specStr();
    const loadingStatus = specSelectors.loadingStatus();
    let loadingMessage = null;

    if (loadingStatus === 'loading') {
      loadingMessage = (
        <div className="info">
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        </div>
      );
    }

    if (loadingStatus === 'failed') {
      loadingMessage = (
        <div className="info">
          <div className="loading-container">
            <h4 className="title">Failed to load API definition.</h4>
            <Errors />
          </div>
        </div>
      );
    }

    if (loadingStatus === 'failedConfig') {
      const lastErr = errSelectors.lastError();
      const lastErrMsg = lastErr ? lastErr.get('message') : '';
      loadingMessage = (
        <div className="info failed-config">
          <div className="loading-container">
            <h4 className="title">Failed to load remote configuration.</h4>
            <p>{lastErrMsg}</p>
          </div>
        </div>
      );
    }

    if (!loadingMessage && isSpecEmpty) {
      loadingMessage = <h4>No API definition provided.</h4>;
    }

    if (loadingMessage) {
      return (
        <div className="swagger-ui">
          <div className="loading-container">{loadingMessage}</div>
        </div>
      );
    }

    const servers = specSelectors.servers();
    const schemes = specSelectors.schemes();
    const hasServers = servers && servers.size;
    const hasSchemes = schemes && schemes.size;
    const hasSecurityDefinitions = !!specSelectors.securityDefinitions();

    return (
      <div className="swagger-ui">
        <SvgAssets />
        <VersionPragmaFilter
          isSwagger2={isSwagger2}
          isOAS3={isOAS3}
          alsoShow={<Errors />}
        >
          <Errors />
          <Row className="information-container">
            <Col mobile={12}>
              <InfoContainer />
            </Col>
          </Row>

          {hasServers || hasSchemes || hasSecurityDefinitions ? (
            <div className="scheme-container">
              <Col className="schemes wrapper" mobile={12}>
                {hasServers ? <ServersContainer /> : null}
                {hasSchemes ? <SchemesContainer /> : null}
              </Col>
              <Col
                className="schemes wrapper"
                style={{ marginTop: `6px` }}
                mobile={12}
              >
                {hasSecurityDefinitions ? <AuthorizeBtnContainer /> : null}
              </Col>
            </div>
          ) : null}

          <FilterContainer />

          <Row>
            <Col mobile={12} desktop={12}>
              <Operations />
            </Col>
          </Row>
          <Row>
            <Col mobile={12} desktop={12}>
              <Models />
            </Col>
          </Row>
        </VersionPragmaFilter>
      </div>
    );
  }
}

// Create the plugin that provides our layout component
const CustomLayoutPlugin = () => ({ components: { CustomLayout } });

// Copied in order to add deepLinking and to not import "swagger-ui" during server-side rendering.
// See https://github.com/swagger-api/swagger-ui/blob/master/flavors/swagger-ui-react/index.js
// and https://github.com/swagger-api/swagger-ui/issues/5580
export default class SwaggerUI extends React.Component {
  constructor(props) {
    super(props);
    this.SwaggerUIComponent = null;
    this.system = null;
  }

  render() {
    return this.SwaggerUIComponent ? <this.SwaggerUIComponent /> : null;
  }

  async componentDidMount() {
    const swaggerUi = await (ExecutionEnvironment.canUseDOM
      ? // This works, but ESLint complains so this file is ignored in .eslintignore
        import('swagger-ui')
      : Promise.resolve({ default: () => {} }));
    const ui = swaggerUi.default({
      plugins: [CustomLayoutPlugin],
      layout: 'CustomLayout',
      url: this.props.url,
      docExpansion: this.props.docExpansion,
      defaultModelExpandDepth: this.props.defaultModelExpandDepth,
      displayOperationId: this.props.displayOperationId,
      deepLinking: this.props.deepLinking,
    });

    this.system = ui;
    this.SwaggerUIComponent = ui.getComponent('App', 'root');
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      // Flush current content
      this.system.specActions.updateSpec('');
      if (this.props.url) {
        // Update internal URL
        this.system.specActions.updateUrl(this.props.url);
        // Trigger remote definition fetch
        this.system.specActions.download(this.props.url);
      }
    }
  }
}
