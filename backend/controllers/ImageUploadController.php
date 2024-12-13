<?php
require_once "vendor/autoload.php";
//Les bibliothèques utilisées pour détecter la présence des codes QR et codes-barres dans les images
use Zxing\QrReader;
use Picqer\Barcode\BarcodeReader;

class ImageUploadController {
    //Cette méthod gére le téléchargement et le traitement des images afin de récuperer le barre-code ou le code QR
    public function menage_image() {
        //Vérification si un fichier a été envoyé
        if($_SERVER["REQUEST_METHOD"] == "POST") {
            if(!isset($_FILES["barcode_image"]) || $_FILES["barcode_image"]["error"] !== UPLOAD_ERR_OK) {
                http_response_code(400);
                echo json_encode(["error" => "Aucun fichier n'à été téléchargé"]);
                return;
            }
            //Vérification du type du fichier
            $fileType = mime_content_type($_FILES["barcode_image"]["tmp_name"]);
            if(!in_array($fileType, ["image/jpeg", "image/png"])) {
                http_response_code(400);
                echo json_encode(["error" => "Seuls les fichier JPG et PNG sont acceptés"]);
                return;
            }
            try {
                //Vérification si l'image contient un code QR si oui : Décodage au format texte
                $qrReader = new QrReader($_FILES["barcode_image"]["tmp_name"]);
                if(!$qrReader) {
                    throw new Exception("Erreur lors de l'initialisation du lecteur QR");
                }
                $qrResult = $qrReader->text();
    
                if(!empty($qrResult)) {
                    echo json_encode(["success" => true, "qr_code" => $qrResult]);
                    return;
                }
                //Si le code QR n'etais pas présent dans l'image une vérification suit si l'image contient un code-barres
                $barcodeReader = new BarcodeReader();
                $results = $barecodeReader->decode($_FILES["barcode_image"]["tmp_name"]);
                
                if(empty($results)) {
                    echo json_encode(["error" => "Aucun code-barres ni QR code n'a été détecté dans le fichier"]);
                    return;
                }
                echo json_encode(["success" => true, "barcode" => $results[0]]);
    
            } catch (Exception $e) {
                //Les messages d'erreur eventuelles livrés par Internal Server Error 
                http_response_code(500);
                echo json_encode(["error" => "Erreur lors du traitement du image :" . $e->getMessage()]);
            }
        } else{
            //Pour la sécurité, ce cas empeche d'utiliser des méthodes autres que le POST
            http_response_code(405);
            echo json_encode(["error" => "Méthode non autorisée"]);
        }
        

    } 
}