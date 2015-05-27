'use strict';

/* jshint -W098 */
angular.module('mean.rrhh').controller('Rrhh.BuscarAgenciaController', function ($scope, $state, sucursal, SGDialog, SGAgencia, toastr) {

    $scope.view = {
        sucursal: sucursal
    };

    $scope.loadObjects = {
        agencias: []
    };

    $scope.loadAgencias = function(){
        $scope.loadObjects.agencias = $scope.view.sucursal.$getAgencias().$object;
    };
    $scope.loadAgencias();

    $scope.edit = function (row) {
        $state.go('^.editarAgencia', {agencia: row.denominacion});
    };

    $scope.remove = function (row) {
        SGDialog.confirmDelete(row.denominacion, 'agencia', function(){
            SGAgencia.$remove($scope.view.sucursal.denominacion, row.denominacion).then(
                function(response){
                    toastr.success('Agencia eliminada');
                    $scope.loadAgencias();
                },
                function error(err){
                    toastr.error(err.data.message);
                }
            );
        });
    };

});