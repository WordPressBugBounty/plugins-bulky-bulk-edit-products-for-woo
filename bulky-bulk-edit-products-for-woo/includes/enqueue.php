<?php

namespace BULKY\Includes;

use BULKY\Admin\History;

defined( 'ABSPATH' ) || exit;

class Enqueue {

	protected static $instance = null;

	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
	}

	public static function instance() {
		return self::$instance == null ? self::$instance = new self() : self::$instance;
	}

	public function register_styles( $styles, $libs = false ) {
		$src    = $libs ? BULKY_CONST_F['libs_url'] : BULKY_CONST_F['dist_url'];
		$suffix = $libs ? '.min.css' : '.css';

		$styles = explode( ',', str_replace( ' ', '', $styles ) );
		foreach ( $styles as $style ) {
			wp_register_style( BULKY_CONST_F['assets_slug'] . $style, $src . $style . $suffix, '', BULKY_CONST_F['version'] );
		}
	}

	public function register_scripts( $scripts, $libs = false ) {
		$src = $libs ? BULKY_CONST_F['libs_url'] : BULKY_CONST_F['dist_url'];
		foreach ( $scripts as $script => $depend ) {
			wp_register_script( BULKY_CONST_F['assets_slug'] . $script, $src . $script . '.min.js', (array) $depend, BULKY_CONST_F['version'], true );
		}
	}

	public function enqueue_styles( $styles ) {
		$styles = explode( ',', str_replace( ' ', '', $styles ) );
		foreach ( $styles as $style ) {
			wp_enqueue_style( BULKY_CONST_F['assets_slug'] . $style );
		}
	}

	public function enqueue_scripts( $scripts ) {
		$scripts = explode( ',', str_replace( ' ', '', $scripts ) );
		foreach ( $scripts as $script ) {
			wp_enqueue_script( BULKY_CONST_F['assets_slug'] . $script );
		}
	}

	public function admin_enqueue_scripts() {
		$screen_id = get_current_screen()->id;
		if ( strpos( $screen_id, 'bulky_page_vi_wbe_' ) !== 0 && $screen_id !== 'toplevel_page_vi_wbe_bulk_editor' ) {
			if ( $screen_id == 'edit-product' ) {
				$this->register_scripts( [ 'admin' => [ 'jquery' ] ] );
				$this->enqueue_scripts( 'admin' );
				$params = [
					'url'  => admin_url( 'admin.php?page=vi_wbe_bulk_editor' ),
					'text' => esc_html__( 'Go to Bulk Editor page', 'bulky-bulk-edit-products-for-woo' ),
				];

				wp_localize_script( BULKY_CONST_F['assets_slug'] . 'admin', 'viWbeParams', $params );
			}
			return;
		}
		$this->register_styles( 'header,tab,menu,segment,form,table,checkbox,dropdown,transition,popup,accordion,select2,button,input,label,list,dimmer,modal,message,icon,jsoneditor,jsuite,jexcel', true );

		$this->register_styles( 'editor,settings' );

		$lib_scripts = [
			'transition' => [ 'jquery' ],
			'dropdown'   => [ 'jquery' ],
			'modal'      => [ 'jquery' ],
			'dimmer'     => [ 'jquery' ],
			'select2'    => [ 'jquery' ],
			'accordion'  => [ 'jquery' ],
			'tab'        => [ 'jquery' ],
			'jsuite'     => [],
			'jsoneditor' => [],
		];

		$scripts = [
			'jexcel'   => [],
			'editor'   => [ 'jquery' ],
			'settings' => [ 'jquery' ]
		];

		$this->register_scripts( $lib_scripts, true );
		$this->register_scripts( $scripts );
		switch ( $screen_id ) {
			case 'toplevel_page_vi_wbe_bulk_editor':
				wp_enqueue_media();
				wp_enqueue_editor();
				wp_enqueue_script( 'jquery-ui-sortable' );

				$this->enqueue_styles( 'checkbox,accordion,jsoneditor,popup,tab,table,dimmer,modal,message,label,input,form,header,select2,transition,dropdown,icon,segment,menu,button,jsuite,jexcel,editor' );
				$this->enqueue_scripts( 'accordion,jsoneditor,tab,dimmer,modal,select2,transition,dropdown,jsuite,jexcel,editor' );

				$columns    = BWCEdit_Data()->get_columns_type();
				$id_mapping = array_keys( $columns );

				$attribute_taxonomies = wc_get_attribute_taxonomies();

				$attr_data = [];
				foreach ( $attribute_taxonomies as $tax ) {
					$taxonomy = wc_attribute_taxonomy_name( $tax->attribute_name );

					$attr_data[ $taxonomy ]['data'] = (array) $tax;

					if ( taxonomy_exists( $taxonomy ) ) {
						$terms = get_terms( ['taxonomy' => $taxonomy, 'hide_empty' => false,] );
						foreach ( $terms as $term ) {
							$attr_data[ $taxonomy ]['terms'][ $term->term_id ] = [ 'slug' => $term->slug, 'text' => $term->name ];
						}
					}
				}

				wp_localize_script( BULKY_CONST_F['assets_slug'] . 'editor', 'wbeParams', [
					'ajaxUrl'        => admin_url( 'admin-ajax.php' ),
					'nonce'          => wp_create_nonce( 'vi_wbe_nonce' ),
					'columns'        => wp_json_encode( array_values( $columns ) ),
					'idMapping'      => $id_mapping,
					'idMappingFlip'  => array_flip( $id_mapping ),
					'attributes'     => $attr_data,
					'metaFields'     => get_option( 'vi_wbe_product_meta_fields' ),
					'settings'       => BWCEdit_Data()->get_settings(),
					'historyPages'   => History::instance()->count_history_pages(),
					'adminUrl'       => admin_url(),
					'frontendUrl'    => site_url(),
					'editType'       => 'products',
					'cellDependType' => $this->set_cell_depend()
				] );

				wp_localize_script( BULKY_CONST_F['assets_slug'] . 'editor', 'wbeI18n', [
					'i18n' => I18n::i18n()
				] );

				break;
			case 'bulky_page_vi_wbe_edit_orders':
			case 'bulky_page_vi_wbe_edit_coupons':
			case 'bulky_page_vi_wbe_edit_reviews':
				$this->enqueue_styles('settings');
				break;

			case 'bulky_page_vi_wbe_settings':
				$this->enqueue_styles( 'form,icon,input,menu,tab,checkbox,button,segment,settings' );
				$this->enqueue_scripts( 'tab,settings' );
				break;
		}
	}

	public function set_cell_depend() {
		$depend = [
			'simple'    => [
				'default_attributes',
				'grouped_products',
				'product_url',
				'button_text',
			],
			'variable'  => [
				'regular_price',
				'sale_price',
				'download_file',
				'download_limit',
				'download_expiry',
				'stock_status',
				'downloadable',
				'sale_date_from',
				'sale_date_to',
				'virtual',
				'grouped_products',
				'product_url',
				'button_text',
			],
			'grouped'   => [
				'regular_price',
				'sale_price',
				'product_url',
				'button_text',
				'default_attributes',
				'cross_sells',
			],
			'external'  => [
				'grouped_products',
				'default_attributes',
				'cross_sells',
				'allow_backorder',
				'sold_individually',
				'virtual',
				'download_file',
				'download_limit',
				'download_expiry',
				'stock_status',
				'downloadable',
			],
			'variation' => [
				'post_excerpt',
				'post_title',
				'post_date',
				'slug',
				'featured',
				'product_cat',
				'product_type',
				'catalog_visibility',
				'allow_reviews',
				'sold_individually',
				'author',
				'tax_status',
				'tags',
				'upsells',
				'cross_sells',
				'post_name',
				'purchase_note',
				'gallery',
				'password',
				'default_attributes',
				'grouped_products',
				'product_url',
				'button_text',
			],
		];

		return apply_filters( 'vi_wbe_set_cell_depend', $depend );
	}

}