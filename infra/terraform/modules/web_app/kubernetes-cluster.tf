resource "azurerm_kubernetes_cluster" "cluster" {
  name = var.flixtube_aks_app_name
  location = var.flixtube_az_region_name
  resource_group_name = var.flixtube_az_resource_group_name
  dns_prefix = var.flixtube_aks_app_name
  kubernetes_version = var.flixtube_kubernetes_version

  default_node_pool {
    name = "default"
    vm_size = "Standard_B2s"
    node_count = 1
  }

  identity {
    type = "SystemAssigned"
  }
}
