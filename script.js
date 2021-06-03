$.ajaxSetup( { async : false } );

const disablePreloader = ( delay ) => {
	setTimeout( () => $( ".preloader" ).addClass( 'done' ), delay );
};

class PortfolioItem {
	constructor ( id, title, description, image, url ) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.url = url;
	}

	render () {
		return $( `
			<div class="card">
				<div class="card-image" style="background-image: url(${ this.image })"></div>
				<a href="${ this.url }" class="card-link" target="_blank">
					<span class="card-visit">Visit</span>
					<div class="card-btn"></div>
				</a>
				<div class="card-content">
				<p class="card-title">${ this.title }</p>
				<p class="card-description">${ this.description }</p>
				</div>
			</div>
		` );
	}
}

const parseData = response => {
	return response.map( ( el, index ) => {
		return new PortfolioItem(
			index,
			el[ "gsx$title" ][ "$t" ],
			el[ "gsx$description" ][ "$t" ],
			el[ "gsx$image" ][ "$t" ],
			el[ "gsx$url" ][ "$t" ]
		);
	} );
};

const getSheet = id => {
	let dataSheetUrl = `https://spreadsheets.google.com/feeds/list/${ id }/od6/public/values?alt=json`;

	$.getJSON( dataSheetUrl, response => {
		let data = parseData( response[ "feed" ][ "entry" ] );
		data.forEach( el => $( ".content" ).append( el.render() ) );
		disablePreloader( 1000 );
	} );
}

$( document ).ready( () => {
		$( "html" ).niceScroll( {
			cursorborder : "1px solid rgba(153,156,160, 0.5)",
			cursorcolor : "rgb(174,186,207)",
			cursoropacitymin : 0.4,
			zindex : 1000
		} );

		$( window ).on( "scroll", () => {
			if ( $( window ).scrollTop() )
				$( ".header" ).addClass( "fixed" );
			else
				$( ".header" ).removeClass( "fixed" );

		} );

		getSheet( "1ptPkvzQbvcreLEGbPwPT5ieS384DbUSiaxDtu8ZOrl4" );
	}
);
