const app = angular.module('patientApp', []);

app.controller('PatientController', function($scope, $http) {
    const API_URL = 'http://localhost:3000/patients';

    $scope.newPatient = {};
    $scope.patients = [];
    $scope.searchQuery = '';
    $scope.sortOption = '';
    $scope.editing = false;

    // Fetch patients
    $scope.fetchPatients = function() {
        const params = {
            search: $scope.searchQuery,
            sort: $scope.sortOption,
        };

        $http.get(API_URL, { params })
            .then(response => {
                $scope.patients = response.data;
            })
            .catch(error => console.error('Error fetching patients:', error));
    };

    // Add or Update a patient
    $scope.savePatient = function() {
        if ($scope.editing) {
            $http.put(`${API_URL}/${$scope.newPatient._id}`, $scope.newPatient)
                .then(() => {
                    $scope.fetchPatients();
                    $scope.newPatient = {};
                    $scope.editing = false;
                })
                .catch(error => console.error('Error updating patient:', error));
        } else {
            $http.post(API_URL, $scope.newPatient)
                .then(() => {
                    $scope.fetchPatients();
                    $scope.newPatient = {};
                })
                .catch(error => console.error('Error adding patient:', error));
        }
    };

    // Edit a patient
    $scope.editPatient = function(patient) {
        $scope.newPatient = angular.copy(patient);
        $scope.editing = true;
    };

    // Cancel Edit
    $scope.cancelEdit = function() {
        $scope.newPatient = {};
        $scope.editing = false;
    };

    // Delete a patient
    $scope.deletePatient = function(id) {
        $http.delete(`${API_URL}/${id}`)
            .then(() => {
                $scope.fetchPatients();
            })
            .catch(error => console.error('Error deleting patient:', error));
    };

    // Initial fetch
    $scope.fetchPatients();
});



