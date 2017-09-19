var $grid;

$( setupMusicBrowser );

function setupMusicBrowser() {
	
	$grid = $( '#grid' );

	$grid.isotope( {
		itemSelector : 'li',
		layoutMode : 'fitRows',
		getSortData : {
			album : function ( e ) { return $( e ).find( 'strong' ).text() }, //'strong' or .album, e : element
			artist : function ( e ) { return $( e ).find( '.artist' ).text() }
		}
	} );
	
	$( '#filterOptions li' ).on( 'click',toggleFilter );
	//$( '#sortOptions li' ).on( 'click',toggleSort );
	$( '#sortOptions' ).on( 'change', toggleSort );
	
	$( '#grid a' ).fancybox( {
		type : 'iframe',
		width : 320,   //width is 320
		hight : 475,
		padding : 0,
		closeBtn : false
	} );
}

function toggleFilter() {
	$( '#filterOptions li' ).removeClass( 'selected' )
	$( this ).addClass( 'selected' )
	
	switch ( this.id ) {
		case 'filterAll' :  //when this.id = 'toggleAll'
		$grid.isotope( { filter : 'li' } );  //show li
		break;
		case 'filterPop' :  
		$grid.isotope( { filter : '.pop' } );  //show class="pop"
		break;
		case 'filterRock' :  
		$grid.isotope( { filter : '.rock' } );
		break;
		case 'filterElectronic' :  
		$grid.isotope( { filter : '.electronic' } );
		break;
	}
}

function toggleSort() {
	$( '#sortOptions li' ).removeClass( 'selected' )
	$( this ).addClass( 'selected' )
	
	/*switch ( this.id ) {
		case 'sortAlbum' :  //when this.id = 'sortleAll'
		$grid.isotope( { sortBy : 'album' } );  //
		break;
		case 'sortArtist' :  
		$grid.isotope( { sortBy : 'artist' } );  //
		break;
		
	} */
	
	$grid.isotope( {sortBy : this.value } );
}

$(document).ready(function () {
          if (!$.browser.webkit) {
              $('.lightbox').html('<p>Sorry! Non webkit users. :(</p>');
          }
      });
