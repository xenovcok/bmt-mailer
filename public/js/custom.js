// iziModal init
$(document).ready(function(){
	$('#use-template').change(function() {
		if($(this).is(":checked")) {
			$('#template-select').attr('disabled', false);
		}else{
			$('#template-select').attr('disabled', true); 
		} 
	});

	$('#use-group').change(function() {
		if($(this).is(":checked")) {
			$('#kontak-group').attr('disabled', false);
		}else{
			$('#kontak-group').attr('disabled', true); 
		} 
	});

	$('#template-select').change(function(){
    	//alert('test');
    	$.ajax({
    		url:"/template/get/"+$("#template-select").val(),
    		type:"GET",
    		dataType:"json",
    		success: function(data){
    			//$("body").append(JSON.stringify(data));
    			//console.log(data);
    			$('textarea#ckeditor_full').val(data.konten);
    		}
    	});
    });

	$('#kontak-group').change(function(){
    	//alert('test');
    	$.ajax({
    		url:"/kontak/get/"+$("#kontak-group").val(),
    		type:"GET",
    		dataType:"json",
    		success: function(data){
    			//$("body").append(JSON.stringify(data));
    			var str = '';
    			for(var i=0;i < data.length;i++){
    				console.log(data[i].email);
    				if(i==data.length-1){
    					str += data[i].email;
    				}else{
    					str += data[i].email+',';
    				}
    			}
    			$('#recipent').val(str);
    			console.log(str);
    			//$('textarea#ckeditor_full').val(data.konten);
    		}
    	});
    });

});


$("#modal-demo").iziModal({
	title:'Tambah Kontak Baru',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#modal-edit").iziModal({
	title:'Edit Kontak',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#modal-list").iziModal({
	title:'Tambah Group List',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#add-template").iziModal({
	title:'Tambah Template',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#list-edit").iziModal({
	title:'Edit Group List',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#edit-template").iziModal({
	title:'Edit Template',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#group-kontak").iziModal({
	title:'Add to Group',
	subtitle:'Bmt-Mailer',
	theme:''

});

$("#modal-group").iziModal({
	title:'Add to Group',
	subtitle:'Bmt-Mailer',
	theme:''
});

$("#modal-member-list").iziModal({
	title:'List Kontak',
	subtitle:'Bmt-Mailer',
	theme:'',
	width: 1200
});

$(document).on('click', '.trigger-link', function (event) {
	event.preventDefault();
	$('#modal-demo').iziModal('open');
});

$(document).on('click', '.btn-add-template', function (event) {
	event.preventDefault();
	$('#add-template').iziModal('open');
});

$(document).on('click', '.add-group', function (event) {
	event.preventDefault();
	$('#modal-group').iziModal('open');
});

$(document).on('click', '.add-group-list', function (event) {
	event.preventDefault();
	$('#group-kontak').iziModal('open');
});

/*$(document).on('click', '#btn-edit-template', function (event) {
	event.preventDefault();
	$('#edit-template').iziModal('open');
});*/

$(document).on('click', '.list-link', function (event) {
	event.preventDefault();
	$('#modal-list').iziModal('open');
});

$(document).on('click', '#edit-list', function (event) {
	event.preventDefault();

	var url = $('tr.selected').attr('id');
	if(typeof url === "undefined"){
		alert('Tidak ada baris yang dipilih');
	}else{
		//$('#modal-edit').iziModal('open');
		var id = $('tr.selected td:nth-child(1)').html();
		var nama = $('tr.selected td:nth-child(2)').html();
		var alias = $('tr.selected td:nth-child(3)').html();
		var desc = $('tr.selected td:nth-child(4)').html();
		var company = $('tr.selected td:nth-child(5)').html();
		var alamat = $('tr.selected td:nth-child(6)').html();
		var kota = $('tr.selected td:nth-child(7)').html();
		var kodepos = $('tr.selected td:nth-child(8)').html();
		var negara = $('tr.selected td:nth-child(9)').html();
		var no_telp = $('tr.selected td:nth-child(10)').html();
		var notif = $('tr.selected td:nth-child(11)').html();

		//untuk tes | alert("Nama:"+nama+"\nEmail:"+email+"\nPhone:"+telp+"\nAlamat:"+alamat);
		$('input#e_id').val(id);
		$('input#e_nama').val(nama);
		$('input#e_alias').val(alias);
		$('textarea#e_desc').val(desc);
		$('input#e_company').val(company);
		$('input#e_alamat').val(alamat);
		$('input#e_kota').val(kota);
		$('input#e_kodepos').val(kodepos);
		$('input#e_negara').val(negara);
		$('input#e_telp').val(no_telp);
		$('input#e_notif').val(notif);


		$('form#editlist').attr('action', '/list/'+id+'/updt');

		$('#list-edit').iziModal('open');

	}

});

$(document).on('click', '#edit-link', function (event) {
	event.preventDefault();

	var url = $('tr.selected').attr('id');
	if(typeof url === "undefined"){
		alert('Tidak ada baris yang dipilih');
	}else{
		//$('#modal-edit').iziModal('open');
		var id = $('tr.selected td:nth-child(1)').html();
		var nama = $('tr.selected td:nth-child(2)').html();
		var email = $('tr.selected td:nth-child(3)').html();
		var telp = $('tr.selected td:nth-child(4)').html();
		var alamat = $('tr.selected td:nth-child(5)').html();

		//untuk tes | alert("Nama:"+nama+"\nEmail:"+email+"\nPhone:"+telp+"\nAlamat:"+alamat);
		$('input#e_id').val(id);
		$('input#e_nama').val(nama);
		$('input#e_email').val(email);
		$('input#e_telp').val(telp);
		$('input#e_alamat').val(alamat);

		$('form#add-kontak').attr('action', '/kontak/'+id+'/updt');

		$('#edit-template').iziModal('open');

	}

});

$(document).on('click', '#btn-edit-template', function (event) {
	event.preventDefault();

	var url = $('tr.selected').attr('id');
	if(typeof url === "undefined"){
		alert('Tidak ada baris yang dipilih');
	}else{
		//$('#modal-edit').iziModal('open');
		var id = $('tr.selected td:nth-child(1)').html();
		var nama = $('tr.selected td:nth-child(2)').html();
		var alias = $('tr.selected td:nth-child(3)').html();
		var konten = $('tr.selected input#hkonten').val();

		//untuk tes | alert("id:"+id+"\nNama:"+nama+"\nalias:"+alias+"\nkonten:"+konten);
		$('input#e_id').val(id);
		$('input#e_nama').val(nama);
		$('input#e_alias').val(alias);
		$('textarea#e_konten').val(konten);

		$('form#frm-edit-template').attr('action', '/template/'+id+'/update');

		$('#edit-template').iziModal('open');

	}

});

$(document).on('click', '.addmember', function (event) {
	event.preventDefault();
	var url = $('tr.selected').attr('id');
	var grup = $('select#groups').val();
	console.log(url+' '+grup);
	if(grup != null){
		if(typeof url === "undefined"){
			alert('Tidak ada baris yang dipilih');
		}else{
			window.location.href='/group/'+url+'/'+grup+'/addgroup';
		}
	}else{
		alert('Pilih Group Terlebih Dahulu');
	}
});

$(document).on('click', '.remove-group', function (event) {
	event.preventDefault();
	var url = $('tr.selected').attr('id');
	var grup = $('select#groups').val();
	if(grup != null){
		if(typeof url === "undefined"){
			alert('Tidak ada baris yang dipilih');
		}else{
			window.location.href='/group/'+url+'/'+grup+'/remove';
		}
	}else{
		alert('Pilih Group Terlebih Dahulu');
	}

});

//Tanda Baris Tabel

$('tr.tablemark').hover(
	function () {
		$(this).css("background","#e6e4e4");
	},
	function () {
		$(this).css("background","");
	}
	);

$('tr.tablemark').click(
	function () {
		if($(this).hasClass('selected')){
			$(this).toggleClass('selected');
		}else{
			$('tr.selected').removeClass('selected');
			$(this).toggleClass('selected');
		}
	});

function del(){
	var url = $('tr.selected').attr('id');
	var conf = confirm('Hapus Data ?');
	if(conf){
		if(typeof url === "undefined"){
			alert('Tidak ada baris yang dipilih');
		}else{
			window.location.href='/kontak/del/'+url;
		}
	}
};

function del_list(){
	var url = $('tr.selected').attr('id');
	var conf = confirm('Hapus Data ?');
	if(conf){
		if(typeof url === "undefined"){
			alert('Tidak ada baris yang dipilih');
		}else{
			window.location.href='/list/del/'+url;
		}
	}
};

function del_templ(){
	var url = $('tr.selected').attr('id');
	var conf = confirm('Hapus Data ?');
	if(conf){
		if(typeof url === "undefined"){
			alert('Tidak ada baris yang dipilih');
		}else{
			window.location.href='/template/del/'+url;
		}
	}
};

// list table

$('tr.edit-table').hover(
	function () {
		$(this).css("background","#e6e4e4");
	},
	function () {
		$(this).css("background","");
	});

$('tr.edit-table').click(
	function () {
		if($(this).hasClass('selected')){
			$(this).toggleClass('selected');
		}else{
			$('tr.selected').removeClass('selected');
			$(this).toggleClass('selected');
		}
	});

$('select#groups').change(function(){
	var group = $(this).val();
	if(group !=null){
		window.location.href='/group/'+group;
	}
});





