<template>
<div>
    <div class="card" style="width: 18rem;">
  <img src="http://206.189.186.199/img/hiredvue200.84f3d6bf.png" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{usuario.email}}</h5>
    <p class="card-text">{{usuario.email}}</p>
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#miModal">
	Ver Informacion
</button>
  </div>
</div>
 <!--Modal--> 
<div class="modal fade" id="miModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title" id="myModalLabel">Nombre usuario</h4>
			</div>
			<div class="modal-body">
				Informacion Usuario
        <form>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Firts name">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="No. Identification">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Experience">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="Idioms">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="No. Contact">
    </div>
  </div>
  <div class="row">
    <div class="col">
      <input type="text" class="form-control" placeholder="Email">
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Lenguages  ">
    </div>
  </div>
</form>
			</div>
		</div>
	</div>
</div>
</div>
        
      </template>
      
      <script>
      import {mapState, mapActions} from 'vuex'
      export default {
        name: 'card',
        data() {
          return {
            candidatos: []
          }
        },
        computed: {
          ...mapState(['usuario'])
        },
        methods: {
          ...mapActions(['getCandidatos']),
          
        },
        created() {
          this.getCandidatos()
        },
      }
      </script>
      
    