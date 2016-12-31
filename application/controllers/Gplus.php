<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class gplus extends CI_Controller {
  public function __construct(){
    parent::__construct();
  }
  public function login(){
    $this->load->library('google');
    $id_token = $this->input->post('token');
    $CLIENT_ID = "884000251920-jsnc6o4o8buh4ek1s208avhj3p5atm07.apps.googleusercontent.com";
    $client = new Google_Client(['client_id' => $CLIENT_ID]);
    $payload = $client->verifyIdToken($id_token);
    if ($payload) {
      echo $userid = $payload['email'];
      // If request specified a G Suite domain:
      //$domain = $payload['hd'];
    } else {
      echo "Invalid Error";
    }
  }
  public function index(){

  }
}
