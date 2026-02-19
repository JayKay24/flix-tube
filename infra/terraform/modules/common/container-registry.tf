resource "azurerm_container_registry" "container_registry" {
  name = var.flixtube_az_container_registry_name
  resource_group_name = var.flixtube_az_resource_group_name
  location = var.flixtube_az_region_name
  admin_enabled = true
  sku = "Basic"
}
