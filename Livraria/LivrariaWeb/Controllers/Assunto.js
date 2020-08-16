< !DOCTYPE html >
    <html>

        <head>
            <script data-require="jquery@*" data-semver="2.1.1" src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
            <script data-require="bootstrap@*" data-semver="3.2.0" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.js"></script>
            <script data-require="angular.js@1.3.5" data-semver="1.3.5" src="https://code.angularjs.org/1.3.5/angular.js"></script>
            <link data-require="bootstrap@*" data-semver="3.2.0" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.css" />
            <link rel="stylesheet" href="style.css" />
            <script src="produto.js"></script>
        </head>

        <body ng-app="ngProdutos">
            <div class="container" ng-controller="produtoCtrl">
                <header>
                    <h1>Produtos</h1>
                </header>
                <div class="navbar-collapse collapse navbar-responsive-collapse">
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <a href="produtos.html">Produtos</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <div class="row well">
                        <h3>Produtos</h3>
                        <div>
                            <div class="row">
                                <div class="col-lg-1">
                                    <a class="right glyphicon glyphicon-plus" id="addDetalhe" ng-click="novoProduto()" data-toggle="modal" data-target="#prodtoModal"></a>
                                </div>
                            </div>
                            <table class="table taable-striped table-hover table-bordered">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Titulo</th>
                                        <th>Descrição</th>
                                        <th>Ação</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="produto in dadosProdutos">
                                        <td>{{ produto.Id }}</td>
                                        <td>{{ produto.Titulo }}</td>
                                        <td>{{ produto.Descricao }}</td>
                                        <td align="center">
                                            <a href="#" class="editar glyphicon glyphicon-pencil" data-toggle="modal" data-target="#prodtoModal" ng-click="editar(produto)"></a>
                                            <a href="#" class="excluir glyphicon glyphicon-remove"></a>
                                            <a href="#" class="detalhes glyphicon glyphicon-book" data-toggle="modal" data-target="#detalheModal" ng-click="verDetalhes(produto)"></a>
                                            <a href="#" class="imagens glyphicon glyphicon-picture" data-toggle="modal" data-target="#imagensModal" ng-click="verImagens(produto)"></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="modal" tabindex="-1" role="dialog" id="prodtoModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 class="modal-title">Editar Produto</h4>
                                </div>
                                <form>
                                    <div class="modal-body" ng-model="produto">
                                        <fieldset>
                                            <!--<legend></legend>-->
                    <div class="form-group">
                                                <label for="titulo" class="col-lg-2 control-label">Título</label>
                                                <div class="col-lg-10">
                                                    <input type="text" class="form-control" id="titulo" ng-model="produto.Titulo" />
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label for="descricao" class="col-lg-2 control-label">Descrição</label>
                                                <div class="col-lg-10">
                                                    <textarea class="form-control" rows="3" id="descricao" ng-model="produto.Descricao"></textarea>
                                                </div>
                                            </div>
                                            <input type="hidden" ng-model="produtoId" value="{{produto.Id}}" />
                                        </fieldset>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" id="voltarPopup">Voltar</button>
                                        <button type="button" class="btn btn-primary" id="salvarPopup" data-dismiss="modal" ng-click="salvarProduto()">Salvar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal" tabindex="-1" role="dialog" id="imagensModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 class="modal-title">Imagens do produto</h4>
                                </div>
                                <div class="modal-body">
                                    <fieldset>
                                        <div class="row">
                                            <div class="col-lg-1">
                                                <a class="right glyphicon glyphicon-plus" id="addImagem" ng-click="novaImagem(produtoIdSelecionado)"></a>
                                            </div>
                                        </div>
                                        <div class="row" ng-show="modoInclusaoImagem">
                                            <form ng-model="imagem">
                                                <div class="modal-body">
                                                    <fieldset>
                                                        <div class="form-group">
                                                            <label for="urlImagem" class="col-lg-2 control-label">Url da imagem</label>
                                                            <div class="col-lg-10">
                                                                <input type="text" class="form-control" id="urlImagem" ng-model="imagem.UrlImagem" />
                                                            </div>
                                                        </div>
                                                        <input type="hidden" ng-model="imagem.Id" value="{{imagem.Id}}" />
                                                        <input type="hidden" ng-model="imagem.ProdutoId" value="{{produtoIdSelecionado}}" />
                                                    </fieldset>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" id="voltarPopup" ng-click="modoInclusaoImagem=false">Voltar</button>
                                                    <button type="button" class="btn btn-primary" id="salvarPopup" ng-click="salvarImagem()">Salvar</button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="row" ng-show="!modoInclusaoImagem">
                                            <theader></theader>
                                            <table class="table table-striped" id="tableImagens">
                                                <tbody>
                                                    <tr>
                                                        <th>Titulo</th>
                                                        <th colspan="2">Url da Imagem</th>
                                                    </tr>
                                                </tbody>
                                                <tbody>
                                                    <tr ng-repeat="imagem in listaImagens">
                                                        <td>{{ imagem.Id }}</td>
                                                        <td>
                                                            <a href="{{imagem.UrlImagem}}">{{ imagem.UrlImagem }}</a>
                                                        </td>
                                                        <td>
                                                            <a href="#" class="editar glyphicon glyphicon-pencil" data-target="#imagensModal" ng-click="editarImagem(imagem)"></a>
                                                            <a href="#" class="excluir glyphicon glyphicon-remove"></a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                    <div class="modal-footer" ng-show="!modoInclusaoImagem">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" id="voltarPopupImagem">Voltar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal" tabindex="-1" role="dialog" id="detalheModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    <h4 class="modal-title">Detalhes do produto</h4>
                                </div>
                                <div class="modal-body">
                                    <fieldset>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-lg-1">
                                                    <a class="right glyphicon glyphicon-plus" id="addDetalhe" ng-click="novoDetalheProduto()"></a>
                                                </div>
                                            </div>
                                            <div class="row" ng-show="modoInclusaoDetalhe">
                                                <form ng-model="detalhe">
                                                    <div class="modal-body">
                                                        <fieldset>
                                                            <div class="form-group">
                                                                <label for="descricaoDetalhe" class="col-lg-2 control-label">Descricao</label>
                                                                <div class="col-lg-10">
                                                                    <input type="text" class="form-control" id="descricaoDetalhe" ng-model="detalhe.Descricao" />
                                                                </div>
                                                            </div>
                                                            <input type="hidden" ng-model="detalhe.Id" value="{{detalhe.Id}}" />
                                                            <input type="hidden" ng-model="detalhe.ProdutoId" value="{{produtoIdSelecionado}}" />
                                                        </fieldset>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" id="voltarDetalhe" ng-click="modoInclusaoDetalhe=false">Voltar</button>
                                                        <button type="button" class="btn btn-primary" id="salvarDetalhe" ng-click="salvarDetalhe()">Salvar</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="false" ng-show="!modoInclusaoDetalhe">
                                                <div class="panel panel-default" ng-repeat="detalhe in listaDetalhes">
                                                    <div class="panel-heading" role="tab" id="heading{{detalhe.Id}}">
                                                        <h4 class="panel-title">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapse{{detalhe.Id}}" aria-expanded="false" aria-controls="collapse{{detalhe.Id}}">
                                                                {{ detalhe.Descricao }}
                                                            </a>
                                                        </h4>
                                                    </div>
                                                    <div id="collapse{{detalhe.Id}}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading{{detalhe.Id}}">
                                                        <div class="panel-body">
                                                            <div class="row">
                                                                <div class="col-lg-1">
                                                                    <a class="right glyphicon glyphicon-plus" id="addItemDetalhe{{detalhe.Id}}" ng-click="novoItemDetalhe(detalhe.Id)"></a>
                                                                </div>
                                                            </div>
                                                            <div class="row" ng-show="modoInclusaoItemDetalhe[detalhe.Id]">
                                                                <form ng-model="itemDetalhe">
                                                                    <div class="modal-body">
                                                                        <fieldset>
                                                                            <div class="form-group">
                                                                                <label for="descricaoItemDetalhe{{detalhe.Id}}" class="col-lg-2 control-label">Descricao</label>
                                                                                <div class="col-lg-10">
                                                                                    <input type="text" class="form-control" id="descricaoItemDetalhe{{detalhe.Id}}" ng-model="itemDetalhe.Descricao" />
                                                                                </div>
                                                                            </div>
                                                                            <div class="form-group">
                                                                                <label for="valorItemDetalhe{{detalhe.Id}}" class="col-lg-2 control-label">Valor</label>
                                                                                <div class="col-lg-10">
                                                                                    <input type="text" class="form-control" id="valorItemDetalhe{{detalhe.Id}}" ng-model="itemDetalhe.Valor" />
                                                                                </div>
                                                                            </div>
                                                                            <input type="hidden" ng-model="itemDetalhe.Id" value="{{itemDetalhe.Id}}" />
                                                                            <input type="hidden" ng-model="itemDetalhe.DetalheId" value="{{detalheIdSelecionado}}" />
                                                                        </fieldset>
                                                                    </div>
                                                                    <div class="modal-footer">
                                                                        <button type="button" class="btn btn-default" id="voltarItemDetalhe{{detalhe.Id}}" ng-click="modoInclusaoItemDetalhe[detalheIdSelecionado]=false">Voltar</button>
                                                                        <button type="button" class="btn btn-primary" id="salvarItemDetalhe{{detalhe.Id}}" ng-click="salvarItemDetalhe()">Salvar</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                            <div class="row" ng-show="!modoInclusaoItemDetalhe[detalheIdSelecionado]">
                                                                <table class="table table-striped" id="tableItemDetalhe{{itemDetalhe.Id}}">
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Descrição</td>
                                                                            <td colspan="2">Valor</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr ng-repeat="itemDetalhe in verItensDetalhe(detalhe.Id)">
                                                                            <td>{{ itemDetalhe.Descricao }}</td>
                                                                            <td>{{ itemDetalhe.Valor }}</td>
                                                                            <td>
                                                                                <a href="#" class="editar glyphicon glyphicon-pencil" ng-click="editarItemDetalhe(itemDetalhe)"></a>
                                                                                <a href="#" class="excluir glyphicon glyphicon-remove"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal" id="voltarDetalhePopup">Voltar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>

    </html>
}