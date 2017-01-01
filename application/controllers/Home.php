<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index(){
		$this->load->library('composerpac');
    $fb = new Facebook\Facebook([
      'app_id' => '138580793302606', // Replace {app-id} with your app id
      'app_secret' => '4619aaef6258bcae3d85e83bbf9f5b30',
      'default_graph_version' => 'v2.2',
    ]);

    $helper = $fb->getRedirectLoginHelper();

    $permissions = ['email']; // Optional permissions
    $loginUrl = $helper->getLoginUrl('http://localhost/project/fb/check/', $permissions);
		$data['fburl'] = htmlspecialchars($loginUrl);
		$this->load->view('landing',$data);
	}
	public function manage(){
		$this->load->view('manage-page');
	}
}
