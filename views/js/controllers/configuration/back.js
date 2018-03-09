/**
* 2007-2018 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author    PrestaShop SA <contact@prestashop.com>
*  @copyright 2007-2018 PrestaShop SA
*  @license   http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*
* Don't forget to prefix your containers with your own identifier
* to avoid any conflicts with others containers.
*/

$(document).ready(function() {

    $(document).on('click', '#psthemecusto .js-wireframe div, #psthemecusto .js-module-name', function(){
        if ($(this).hasClass('active')) {
            resetActiveModule();
        } else {
            resetActiveModule();
            setActiveModule($(this));
        }
    });

    $(document).on('click', '#psthemecusto button', function(event) {
        event.preventDefault();
        let action = $(this).parent('div').data('action');
        let name = $(this).parent('div').data('module_name');
        let displayName = $(this).parent('div').data('module_displayname');
        let url = $(this).parent('div').prop('action');
        let id_module = $('.src_parent_'+name).data('id_module');

        if (action == 'uninstall' || action == 'disable' || action == 'reset') {
            $('.modal .action_available').hide();
            $('.modal .'+action).show();
            $('.modal .modal-footer a').prop('href', url).attr('data-name', name).attr('data-action', action);
            $('.modal .module-displayname').html(displayName);
        } else {
            ajaxActionModule(action, id_module);
        }
    });

    $(document).on('click', '#psthemecusto .modal .modal-footer a', function(event) {
        event.preventDefault();
        // let url = $(this).attr('href');
        let name = $(this).data('name');
        let action = $(this).data('action');
        let id_module = $('.src_parent_'+name).data('id_module');

        ajaxActionModule(action, id_module);
    });

});

function resetActiveModule()
{
    $('#psthemecusto .js-wireframe div').removeClass('active');
    $('#psthemecusto .js-module-name').removeClass('active');
    $('#psthemecusto .js-module-name').parent('.configuration-rectangle').removeClass('active');
    $('#psthemecusto .js-module-name').parent('.configuration-rectangle').find('.module-informations').slideUp();
}

function setActiveModule(elem)
{
    let module = elem.data('module_name');
    $('.js-img-'+module).addClass('active');
    $('.js-title-'+module).addClass('active');
    $('.js-title-'+module).parent('.configuration-rectangle').addClass('active');
    $('.js-title-'+module).parent('.configuration-rectangle').find('.module-informations').slideDown();
}

function ajaxActionModule(action, id_module)
{

    $.ajax({
        type: 'POST',
        url: admin_module_ajax_url_psthemecusto,
        data: {
            ajax : true,
            action : 'UpdateModule',
            id_module : id_module,
            action_module : action
        },
        success : function(data) {
          console.log( data);
        },
        error : function(data) {

        }
    });
    // $.ajax({
    //     type: 'POST',
    //     url: url,
    //     dataType: 'json',
    //     success : function(data) {
    //         $.growl.notice({ title: "Notice!", message: data[module_name].msg });
    //         $('.src_parent_'+module_name).html(data[module_name].action_menu_html);
    //     },
    //     error : function(data) {
    //         $.growl.error({ title: "Notice!", message: data[module_name].msg });
    //     }
    // });
}