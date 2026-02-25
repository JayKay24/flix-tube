resource "azurerm_role_assignment" "role_assignment" {
  principal_id = azurerm_kubernetes_cluster.staging_qa_cluster.kubelet_identity[0].object_id
  role_definition_name = "AcrPull"
  scope = var.flixtube_az_container_registry_id
  skip_service_principal_aad_check = true
}
