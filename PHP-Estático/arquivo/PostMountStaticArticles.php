<?php

class MountToStatic {

    private $rota;

    public function __construct($rota) {
        $this->rota = $rota;
        $this->mount();
    }

    public function mount() {
        $articles_path = "posts/";
        $static_path = "/static/blog/" . $this->rota;
        $dependencies_path = $this->rota . "../dependencias_files/";

        if (!file_exists($dependencies_path)) {
            mkdir($dependencies_path);
        }

        $header = file_get_contents("components/html/header.html");
        $footer = file_get_contents("components/html/footer.html");

        // Copia os arquivos da pasta "dependencias_files" da raiz para a pasta "dependencias_files" da rota
        $root_dependencies = glob("dependencias_files/*");
        foreach ($root_dependencies as $dependency) {
            if (!is_dir($dependency)) {
                $file_name = basename($dependency);
                copy($dependency, $dependencies_path . $file_name);
            }
        }

        $articles = scandir($articles_path);
        foreach ($articles as $article) {
            if ($article != "." && $article != "..") {
                $article_content = file_get_contents("$articles_path$article");
                $title = $this->getTitle($article_content);
                $header = str_replace("<title>Fort Planos - Fort Planos | O todo de planos de saúde</title>", "<title>$title</title>", $header);
                $article_content = $header . $article_content . $footer;

                $static_file = fopen("$static_path$article", "w");
                fwrite($static_file, $article_content);
                fclose($static_file);

                echo "$article gravado com sucesso na pasta static<br>";
            }
        }
    }

    public function getTitle($html) {
        preg_match("/<h[1-6](.*?)>(.*?)<\/h[1-6]>/", $html, $matches);
        return $matches[2];
    }
}

$rota = "nova-rota";
$mount = new MountToStatic($rota);