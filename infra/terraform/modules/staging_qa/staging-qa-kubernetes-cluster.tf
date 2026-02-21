resource "azurerm_kubernetes_cluster" "staging_qa_cluster" {
  name = var.flixtube_staging_qa_aks_app_name
  location = var.flixtube_az_region_name
  resource_group_name = var.flixtube_az_resource_group_name
  dns_prefix = var.flixtube_staging_qa_aks_app_name
  kubernetes_version = var.flixtube_kubernetes_version

  default_node_pool {
    name = "default"
    vm_size = "Standard_B2s"
    node_count = 4
  }

  identity {
    type = "SystemAssigned"
  }

  oidc_issuer_enabled = true
}
