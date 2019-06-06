import React from 'react';
import { Helmet } from "react-helmet";
import brace from 'brace';
import AceEditor from 'react-ace';
import { Element, animateScroll } from 'react-scroll';
import './sass/embedtest.scss';

import 'brace/mode/html';
import 'brace/theme/xcode';


class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			value: '',
			embed: null
		}
		this.submitCode = this.submitCode.bind(this);
		this.onChange = this.onChange.bind(this);
		this.exampleLink = this.exampleLink.bind(this);
	}
	onChange(v) {
		this.setState({
			value: v,
		});
		return true;
	}
	
	submitCode(e) {
		if(this.state.value!=="") {
			this.setState({
				embed: this.state.value
			})
			animateScroll.scrollTo(document.getElementById('embed').getBoundingClientRect().top);
		}
	}
	exampleLink(e){
		var v = e.target.getAttribute('data-code')
		console.log(v);
		e.preventDefault();
		this.setState({
			value: v,
			embed: v
		})
		animateScroll.scrollTo(document.getElementById('embed-test').getBoundingClientRect().top);
	}
	render() {
		return (
			<div className="App">
				<Helmet>
					<meta name="robots" content="noindex,follow" />
					<title>EmbedTest</title>
					<meta name="description" content="Test embed codes" />
				</Helmet>
				<div id="embed-test">
					<div>
						<div className="container">
							<h1><span>&lt;</span> embedtest <span>/&gt;</span></h1>
							<AceEditor
								mode="html"
								theme="xcode"
								onChange={this.onChange}
								name="editor"
								editorProps={{$blockScrolling: true}}
								maxLines={ 12 }
								minLines={ 12 }
								width="100%"
								showPrintMargin={ false }
								wrapEnabled={ true }
								defaultValue=""
								value={this.state.value}
							/>
							<div className="btn btn" id="go" onClick={this.submitCode}>Test <i className="fa fa-magic"></i></div> 
							<div className="btn btn-alt" onClick={e => animateScroll.scrollTo(document.getElementById('examples').getBoundingClientRect().top)}>Examples <i className="fa fa-chevron-down" ></i></div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="container">
						<div id="embed" className={this.state.embed!==null?'active':''} dangerouslySetInnerHTML={{ __html: this.state.embed }}></div>
						<h3>Example Embeds</h3> 
						<div id="examples">
							<div className="btn" onClick={this.exampleLink} data-code={'<iframe src="http://fractlstaging.com/tools/interactive-templates/interactive-embed-dynamic/" width="100%" height="300px" style="display:table;max-width:100%;margin:auto;width:800px;" frameBorder="0" scrolling="no"></iframe>'}>Iframe Example</div>
							<div className="btn" onClick={this.exampleLink} data-code={'<div id="interactive"></div><script type="text/javascript" src="https://api.frac.tl/cdn/pym.noscroll.js"></script><script>new pym.Parent("interactive", "http://fractlstaging.com/tools/interactive-templates/interactive-embed-dynamic/", {});</script>'}>Dynamic Height Example</div>
						</div>
						<div className="footer">© { new Date().getFullYear() } EmbedTest.com</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
