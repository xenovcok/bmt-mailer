var mongoose = require('mongoose');
var session = require('express-session');
var Kontak = require('../models/kontak.js').Kontak;
var List = require('../models/list.js').List;
var Template = require('../models/template.js').Template;
var mailer = require('../config/mail.config');

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', {title : 'Mastermail - BMT Mailer'});
	});

	app.get('/broadcast', function(req, res){
		Template.find({}, function(err, data){
			if(err)
				throw err;
			List.find({}, function(err, list){
				res.render('mail', {temp:data, datagroup:list, title:'Mail Broadcaster'});
			});
		});

	});

	app.get('/test', function(req, res){
		res.render('mail', {flash : {type:'alert-danger', messages : 'test error!'}});
	});

	app.post('/mailer', function(req, res){
		var txt = req.body.isi;
		var mailist = req.body.recipent;
		var datasplit = mailist.split(",");
		var panjang = datasplit.length;

		for (var i = 0; i < panjang; i++) {
			console.log(datasplit[i]);
			Kontak.findOne({'email':datasplit[i]}, function sendMail(err, data) {

				var txtreplace = txt.replace('!user!', data.nama);
				var mailOptions = {
					from:req.body.from,
					to:data.email,
					subject:req.body.subject,
					html: txtreplace
				}

				mailer.sendMail(mailOptions, function(err, info) {
					if (err) {
						console.log(err)
					} else {
						console.log(info.response);
					}
				});
			});
		}

		

		res.send(panjang + " Email dikirim");

	});

	app.get('/dashboard', function(req, res){
		res.render('dashboard');
	});

	app.get('/kontak', function(req, res){
		Kontak.find({}, function(err, kontak){
			if (err) throw err;
			console.log('data retreived');

			res.render('kontak', {data:kontak, title:"BMT-Mailer | Kontak"});

		});
	});

	app.get('/group/:id', function(req, res){
		List.find({}, function(err, list){
			Kontak.find({"group":""}, function(err, kontak2){
				Kontak.find({"group":req.params.id}, function(err, kontak){
					if (err) throw err;
					//console.log(req.params.id);
					res.render('group', {listgroup:list, listkontak:kontak, kontakwogroup:kontak2, pilihan:req.params.id});
				});
			});
		});
	});

	app.get('/group', function(req, res){
		List.find({}, function(err, list){
			Kontak.find({"group":""}, function(err, kontak2){
				Kontak.find({}, function(err, kontak){
					if (err) throw err;

					res.render('group', {listgroup:list, listkontak:kontak, kontakwogroup:kontak2, title:'BMT-Mailer | Group'});
				});
			});
		});
	});


	app.post('/kontak', function(req, res){
		var data  = new Kontak();

		data.nama = req.body.nama;
		data.email =  req.body.email;
		data.telp = req.body.telp;
		data.alamat = req.body.alamat;
		data.group = "";

		data.save(function(err){
			if(err){
				res.send('Email Sudah Terpakai');
			}else{
				res.redirect('/kontak');
			}

			//session.set('sukses', '1');
			
		});
	});

	app.get('/group/:id/:gr/addgroup', function(req, res){
		Kontak.findById(req.params.id, function(err, kontak) {
			if (err)
				res.send(err);

        	kontak.group = req.params.gr;  // update the bears info

		   // console.log("id = "+req.params.id);
		   // console.log("group = "+req.params.gr);

            // save the bear
            kontak.save(function(err) {
            	if (err)
            		res.send(err);

            	console.log('data update success');

            	res.redirect('/group/'+req.params.gr);
            	//res.send('update sukses');
            });

        });

		//Kontak.update({_id:req.params.id} , {$set : { group:req.params.gr}}, res.redirect('/group/'+req.params.gr));
	});

	app.get('/group/:id/:gr/remove', function(req, res){
		Kontak.findById(req.params.id, function(err, kontak) {
			if (err)
				res.send(err);

        	kontak.group = "";  // update the bears info

		   // console.log("id = "+req.params.id);
		   // console.log("group = "+req.params.gr);

            // save the bear
            kontak.save(function(err) {
            	if (err)
            		res.send(err);

            	console.log('data update success');

            	res.redirect('/group/'+req.params.gr);
            	//res.send('update sukses');
            });

        });

		//Kontak.update({_id:req.params.id} , {$set : { group:req.params.gr}}, res.redirect('/group/'+req.params.gr));
	});

	app.get('/list', function(req, res){
		List.find({}, function(err, list){
			if (err) throw err;
			console.log('data retreived');

			res.render('list', {datalist:list, title:'BMT-Mailer | List'});

		});
	});

	app.post('/list', function(req, res){
		var datalist  = new List();

		datalist.list_nama = req.body.nama;
		datalist.deskripsi =  req.body.desc;
		datalist.perusahaan = req.body.company;
		datalist.alamat = req.body.alamat;
		datalist.kota = req.body.kota;
		datalist.kode_pos = req.body.kodepos;
		datalist.negara = req.body.negara;
		datalist.no_telp = req.body.telp;
		datalist.notif = req.body.notif;
		datalist.list_id = req.body.alias;

		datalist.save(function(err){
			if(err)
				res.send(err);

			//session.set('sukses', '1');
			res.redirect('/list');
		});
	});

	app.get('/template', function(req, res){
		Template.find({}, function(err, data){
			if (err) throw err;
			res.render('addtemplate', {templdata:data, title:'BMT-Mailer | Email Template'});
		});
	});

	app.post('/template', function(req, res){
		var templ  = new Template();

		templ.template_alias = req.body.alias;
		templ.nama = req.body.nama;
		templ.konten = req.body.konten;
		templ.kategori = req.body.kategori;

		templ.save(function(err){
			if(err)
				res.send(err);

			//session.set('sukses', '1');
			res.redirect('/template');
		});
	});

	app.post('/template/:id/update', function(req, res){
		Template.findById(req.params.id, function(err, templ) {

			if (err)
				res.send(err);

			templ.template_alias = req.body.alias;
			templ.nama = req.body.nama;
			templ.konten = req.body.konten;
			templ.kategori = req.body.kategori;

			templ.save(function(err){
				if(err)
					res.send(err);

			//session.set('sukses', '1');
			res.redirect('/template');
		});
		});
	});

	app.get('/kontak/del/:id', function(req,res){
		Kontak.remove({
			_id: req.params.id
		}, function(err, kontak){
			if(err)
				res.send(err);

			res.redirect('/kontak');
		});
	});

	app.get('/template/del/:id', function(req,res){
		Template.remove({
			_id: req.params.id
		}, function(err, kontak){
			if(err)
				res.send(err);

			res.redirect('/template');
		});
	});

	app.get('/template/get/:id', function(req,res){
		Template.findById(req.params.id, function(err, templ) {
			res.json(templ);
		});
	});

	app.get('/kontak/get/:id', function(req,res){
		List.findById(req.params.id, function(err, list) {
			Kontak.find({'group':list.list_id}, function(err, kontak) {
				res.json(kontak);
			});
		});	
	});

	app.get('/list/del/:id', function(req,res){

		List.findById(req.params.id, function(err, listg){
			var conditions = { group:listg.list_id }
			, update = { group: "" }
			, options = { multi: true };

			Kontak.update(conditions, update, options, callback);

			function callback (err, numAffected) {
				console.log(listg.list_id + ' Rows Updated');
			};

			List.remove({
				_id: req.params.id
			}, function(err, list){
				if(err)
					res.send(err);
				res.redirect('/list');
			});
		});



	/*	var conditions = { group:grp }
		, update = { group: "" }
		, options = { multi: true };

		Kontak.update(conditions, update, options, callback);

		function callback (err, numAffected) {
			console.log( numAffected + ' Rows Updated');
		};

	List.remove({
		_id: req.params.id
	}, function(err, list){
		if(err)
			res.send(err);

		res.redirect('/list');
	});
	*/
});

	app.post('/kontak/:id/updt', function(req, res) {

        // use our bear model to find the bear we want
        Kontak.findById(req.params.id, function(err, kontak) {

        	if (err)
        		res.send(err);

        	kontak.nama = req.body.nama;
        	kontak.email =  req.body.email;
        	kontak.telp = req.body.telp;
		      kontak.alamat = req.body.alamat;  // update the bears info

		   // console.log(req.body.nama+" "+req.body.email+" "+req.body.telp+" "+req.body.alamat);

            // save the bear
            kontak.save(function(err) {
            	if (err)
            		res.send(err);

            	console.log('data update success');

            	res.redirect('/kontak');
            });

        });
    });

	app.post('/list/:id/updt', function(req, res) {

        // use our bear model to find the bear we want
        List.findById(req.params.id, function(err, list) {

        	if (err)
        		res.send(err);

        	list.list_nama = req.body.nama;
        	list.deskripsi =  req.body.desc;
        	list.perusahaan = req.body.company;
        	list.alamat = req.body.alamat;
        	list.kota = req.body.kota;
        	list.kode_pos = req.body.kodepos;
        	list.negara = req.body.negara;
        	list.no_telp = req.body.telp;
        	list.norif = req.body.notif;
        	list.list_id = req.body.alias;


            // save the bear
            list.save(function(err) {
            	if (err)
            		res.send(err);

            	console.log('data update success');
            	res.redirect('/list');
            });

        });
    });
}
