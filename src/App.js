import React from 'react';
import { Helmet } from "react-helmet";
import AceEditor from 'react-ace';
import './sass/embedtest.scss';

import 'brace/mode/html';
import 'brace/theme/xcode';


class App extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			embed: null
		}
		this.value = ""
		this.setEmbed = this.setEmbed.bind(this);
		this.onChange = this.onChange.bind(this);
		this.exampleLink = this.exampleLink.bind(this);
	}
	onChange(v) {
		this.value = v
		return true;
	}

	setEmbed(e=null,scrollup=false) {
		if(this.value!=="") {
			this.setState({
				embed: this.value
			})
			setTimeout(function(){
				window.scrollTo({
					top: scrollup ? 0 : document.getElementById('embed').getBoundingClientRect().top,
					behavior: 'smooth'
					});
			}, 500);
		}
	}

	exampleLink(e){
		var v = e.target.getAttribute('data-code')
		e.preventDefault();
		this.value = v
		this.setEmbed(null,true);
	}
	toggleDropdown(e) {
		e.preventDefault();
		e.target.closest('.dropdown').classList.toggle("active");
		
	}
	render() {
		return (
			<div className="App">
				<Helmet>
					<meta name="robots" content="noindex,follow" />
					<title>EmbedTest</title>
					<meta name="description" content="Test embed codes" />
					<link href="https://fonts.googleapis.com/css?family=Roboto:400,700,900|Source+Code+Pro:400,700,900" rel="stylesheet" />
					<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" type="text/css" rel="stylesheet" />
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
								value={this.value}
							/>
							<div className="btns">
								<div className="btn btn" id="go" onClick={this.setEmbed}>Test <i className="fa fa-magic"></i></div> 
								<div className="dropdown">
									<div className="btn btn-alt dropbtn" onClick={this.toggleDropdown}>Examples <i className="fa fa-chevron-down" ></i></div>
									<div className="dropdown--content">
										<div onClick={this.exampleLink} data-code={'<iframe src="https://fractlstaging.com/tools/interactive-templates/interactive-embed-dynamic/" width="100%" height="300px" style="display:table;max-width:100%;margin:auto;width:800px;" frameBorder="0" scrolling="no"></iframe>'}>Simple Iframe</div>
										<div onClick={this.exampleLink} data-code={'<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ScMzIvxBSi4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'}>Youtube Video</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="container">
						<div id="embed" className={this.state.embed!==null?'active':''} dangerouslySetInnerHTML={{ __html: this.state.embed }}></div>
						
						<div className="footer row">
							<div className="col">
								<div className="copyright">
									© { new Date().getFullYear() } EmbedTest.com
								</div>
							</div>
							<div className="col">
								<div className="social-media">
									<a href="https://twitter.com/embedtest_com" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter" aria-hidden="true"></i></a>
									<a href="https://github.com/Szar/EmbedTest" target="_blank" rel="noopener noreferrer"><i className="fa fa-github-alt" aria-hidden="true"></i></a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
